const Boom = require("@hapi/boom");
const { findUserByEmail, findUserById } = require("../DB/findUser");

const verifyUserEmail = async (request, h) => {
  const user = await findUserByEmail(request.payload.email);

  if (user.length >= 1) {
    return Boom.badRequest("A user with that email already exists");
  }

  return h.response(user);
};

const verifyUserId = async (request, h) => {
  const user = await findUserById(request.params.id);

  if (user.length < 1) {
    return Boom.notFound("The user with the given ID does not exist in our DB");
  }
  return h.response(user);
};

module.exports = { verifyUserEmail, verifyUserId };
