const db = require("../../src/DB/connection");

const findAllUsers = async () => {
  const users = await new Promise((resolve, reject) => {
    db.query("SELECT name, email FROM users", (err, users) => {
      if (err) reject(err);
      resolve(users);
    });
  });

  if (users.length < 1) {
    return Boom.notFound("There are no users registered");
  }
  return users;
};

const findUserByEmail = async (email) => {
  const user = await new Promise((resolve, reject) => {
    db.query(`SELECT * FROM users WHERE email='${email}'`, (err, user) => {
      if (err) reject(err);
      resolve(user);
    });
  });
  return user;
};

const findUserById = async (id) => {
  const user = await new Promise((resolve, reject) => {
    db.query(`SELECT * FROM users WHERE id='${id}'`, (err, user) => {
      if (err) reject(err);
      resolve(user);
    });
  });
  return user;
};

module.exports = { findUserByEmail, findUserById, findAllUsers };

