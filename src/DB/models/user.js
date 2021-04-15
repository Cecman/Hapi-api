const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  password: Joi.string()
    .pattern(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=\\S*$)[a-zA-Z0-9!@#$%^&*]{8,}"
      )
    )
    .message(
      "A password must not contain a whitespace, be at least 8 characters long and must contain 1 Uppercase, Number and a Special character(!@# etc.)"
    )
    .required(),
  email: Joi.string().min(4).max(100).email().required(),
});

const validate = (user) => {
  return schema.validate(user);
};

module.exports = validate;
