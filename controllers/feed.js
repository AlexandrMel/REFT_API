const { head } = require("../routes/feed");
const { validationResult } = require("express-validator");
const Post = require("../models/post");

exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [
      {
        _id: "1",
        title: "First Post",
        content: "This is the first post!",
        imageUrl:
          "https://i.pinimg.com/736x/5b/b4/8b/5bb48b07fa6e3840bb3afa2bc821b882.jpg",
        creator: {
          name: "Alexandr",
        },
        createdAt: new Date(),
      },
    ],
  });
};
exports.createPost = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
   const error = new Error('Validation failed, entered data is incorrect.')
     error.statusCode = 422;
     throw error;
  }
  const title = req.body.title;
  const content = req.body.content;
  const post = new Post({
    title: title,
    content: content,
    creator: {
      name: "Alexandr",
    },
    imageUrl:
      "https://i.pinimg.com/736x/5b/b4/8b/5bb48b07fa6e3840bb3afa2bc821b882.jpg",
  });
  post
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Post created successfully!",
        post: result,
      });
    })
    .catch((err) => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err)
    } );
};
