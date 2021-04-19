const Joi = require("joi");
const Boom = require("@hapi/boom");

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

const verifyInput = (request, h) => {
  const validate = schema.validate(request.payload);
  const { error } = validate;
  if (error) {
    return Boom.badRequest(error.details[0].message);
  }
  return h.response(request.payload);
};

module.exports = verifyInput;
