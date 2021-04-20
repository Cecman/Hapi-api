const Joi = require("joi");

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

const validate = (user) => {
  return schema.validate(user);
};

module.exports = validate;
