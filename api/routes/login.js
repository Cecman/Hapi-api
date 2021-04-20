require("dotenv").config();
const verifyUser = require("../../src/authentication/validateLoginCredentials");
const verifyLoginInput = require("../../src/authentication/verifyLoginInput");
const asyncTcHandler = require("../../src/error");
const loginHandler = require("../handlers/loginHandlers");

const loginUser = {
  method: "POST",
  path: "/login",
  options: {
    description: "Login user",
    tags: ["api"],
    auth: false,
    pre: [
      { method: verifyLoginInput, assign: "input" },
      { method: verifyUser, assign: "user" },
    ],
    handler: asyncTcHandler(loginHandler),
  },
};

module.exports = loginUser;
