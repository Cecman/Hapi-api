require("dotenv").config();
const bcrypt = require("bcrypt");
const Joi = require("joi");
const Boom = require("@hapi/boom");
const JWT = require("jsonwebtoken");
const { findUserByEmail } = require("../../src/DB/findUser");

const schema = Joi.object({
  email: Joi.string().min(4).max(100).email().required(),
  password: Joi.string()
    .pattern(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=\\S*$)[a-zA-Z0-9!@#$%^&*]{8,}"
      )
    )
    .message(
      "A password must not contain a whitespace and must contain 1 Uppercase, Number and a Special character(!@# etc.)"
    )
    .required(),
});

const validate = (request) => {
  return schema.validate(request);
};

const loginUser = {
  method: "POST",
  path: "/login",
  options: {
    description: "Login user",
    tags: ["api"],
    auth: false,
    handler: async (request, h) => {
      const { error } = validate(request.payload);
      if (error) {
        return Boom.badRequest(error.details[0].message);
      }

      const user = await findUserByEmail(request.payload.email);
      if (!user) {
        return Boom.badRequest("Invalid name or password");
      }

      const validPassword = await bcrypt.compare(
        request.payload.password,
        user[0].password
      );
      if (!validPassword) {
        return Boom.badRequest("Invalid name or password");
      }

      const token = JWT.sign(request.payload, process.env.API_KEY);
      //sent token to response for simplicity and testing
      return h.response(token).header("x-auth-token", token);
    },
  },
};

module.exports = loginUser;
