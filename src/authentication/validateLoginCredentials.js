const bcrypt = require("bcrypt");
const Boom = require("@hapi/boom");
const { findUserByEmail } = require("../DB/findUser");

const verifyUser = async (request, h) => {
  const user = await findUserByEmail(request.payload.email);

  if (user.length >= 1) {
    const validPassword = await bcrypt.compare(
      request.payload.password,
      user[0].password
    );
    if (!validPassword) return Boom.badRequest("Invalid password");
  }

  if (user.length < 1) {
    return Boom.badRequest("Invalid email or password");
  }
  return h.response(user);
};

module.exports = verifyUser;
