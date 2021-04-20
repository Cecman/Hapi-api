const Boom = require("@hapi/boom");
const validateInput = require("../DB/models/user");

const verifyUserInput = (request, h) => {
  const validate = validateInput(request.payload);
  const { error } = validate;
  if (error) {
    return Boom.badRequest(error.details[0].message);
  }
  return h.response(request.payload);
};

module.exports = verifyUserInput;
