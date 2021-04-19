const db = require("../../src/DB/connection");
const bcrypt = require("bcrypt");
const Boom = require("@hapi/boom");

const verifyUser = async (request, h) => {
  const user = await new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM users WHERE email='${request.payload.email}'`,
      (err, user) => {
        if (err) reject(err);
        resolve(user);
      }
    );
  });

  if (user.length >= 1) {
    const validPassword = await bcrypt.compare(
      request.payload.password,
      user[0].password
    );
    if (!validPassword) return Boom.badRequest("Invalid password");
  }

  if (user.length < 1) {
    return Boom.badRequest("Invalid name or password");
  }
  return h.response(user);
};

module.exports = verifyUser;
