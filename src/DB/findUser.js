const db = require("../../src/DB/connection");
const Boom = require("@hapi/boom");

const findAllUsers = async () => {
  const users = await new Promise((resolve, reject) => {
    db.query("SELECT name, email FROM users", (err, users) => {
      if (err) reject(err);
      resolve(users);
    });
  });
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
