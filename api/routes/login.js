require("dotenv").config();
const JWT = require("jsonwebtoken");
const verifyUser = require("../../src/authentication/validateCredentials");

const loginUser = {
  method: "POST",
  path: "/login",
  options: {
    description: "Login user",
    tags: ["api"],
    auth: false,
    pre: [{ method: verifyUser, assign: "user" }],
    handler: async (request, h) => {
      const token = JWT.sign(request.payload, process.env.API_KEY);
      //sent token to response for simplicity and testing
      return h.response(token).header("x-auth-token", token);
    },
  },
};

module.exports = loginUser;
