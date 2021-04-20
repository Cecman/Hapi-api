const Boom = require("@hapi/boom");
const validateLogin = require("../DB/models/login");

const verifyLoginInput = (request, h) => {
  const validate = validateLogin(request.payload);
  const { error } = validate;
  if (error) {
    return Boom.badRequest(error.details[0].message);
  }
  return h.response(request.payload);
};

module.exports = verifyLoginInput;
