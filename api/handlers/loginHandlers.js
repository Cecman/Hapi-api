const JWT = require("jsonwebtoken");

const loginHandler = async (request, h) => {
  const token = JWT.sign(request.payload, process.env.API_KEY);
  //sent token to response for simplicity and testing
  return h.response(token).header("x-auth-token", token);
};

module.exports = loginHandler;
