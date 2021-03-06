const expect = require("chai").expect;
const sinon = require("sinon");
const mongoose = require("mongoose");
require("dotenv").config();

const User = require("../models/user");
const AuthController = require("../controllers/auth");

describe("Auth Controller - Login", function () {
  before(function (done) {
    mongoose
      .connect(process.env.MONGO_DB_TEST_URI)
      .then((result) => {
        const user = new User({
          email: "test@test.com",
          password: "tester",
          name: "Testing",
          posts: [],
          _id: "5f09a37c16eeda656351f266",
        });
        return user.save();
      })
      .then(() => {
        done();
      });
  });
  beforeEach(function () {});

  afterEach(function () {});
  it("should throw an error with code 500 if accessing the database fails", function (done) {
    sinon.stub(User, "findOne");
    User.findOne.throws();
    const req = {
      body: {
        email: "test@test.com",
        password: "tester",
      },
    };
    AuthController.login(req, {}, () => {})
      .then((result) => {
        expect(result).to.be.an("error");
        expect(result).to.have.property("statusCode", 500);
      })
      .then(() => {
        done();
      });

    User.findOne.restore();
  });

  it("should send a response with a valid user status for an existing user", function (done) {
    const req = {
      userId: "5f09a37c16eeda656351f266",
    };
    const res = {
      statusCode: 500,
      userStatus: null,
      status: function (code) {
        this.statusCode = code;
        return this;
      },
      json: function (data) {
        this.userStatus = data.status;
      },
    };
    AuthController.getUserStatus(req, res, () => {}).then(() => {
      expect(res.statusCode).to.be.equal(200);
      expect(res.userStatus).to.be.equal("I am new!");
      done();
    });
  });
  after(function (done) {
    User.deleteMany()
      .then(() => {
        return mongoose.disconnect();
      })
      .then(() => {
        done();
      });
  });
});
