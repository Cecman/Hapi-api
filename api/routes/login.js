const bcrypt = require("bcrypt");
const { User } = require("../../src/DB/models/user");
const Joi = require("joi");
const Boom = require("@hapi/boom");
const asyncTcHandler = require("../../src/error");

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
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
  handler: asyncTcHandler(async (request, h) => {
    const { error } = validate(request.payload);
    if (error) {
      return Boom.badRequest(error.details[0].message);
    }

    let user = await User.findOne({ where: { name: request.payload.name } });
    if (!user) {
      return Boom.badRequest("Invalid name or password");
    }

    const validPassword = await bcrypt.compare(
      request.payload.password,
      user.password
    );
    if (!validPassword) {
      return Boom.badRequest("Invalid name or password");
    }

    return h.response("Logged In");
  }),
};

module.exports = loginUser;
