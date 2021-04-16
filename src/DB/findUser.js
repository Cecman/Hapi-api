const db = require("../../src/DB/connection");

const findAllUsers = async () => {
  const users = await new Promise((resolve, reject) => {
    db.query("SELECT name, email FROM users", (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });

  if (users.length < 1) {
    return Boom.notFound("There are no users registered");
  }
  return users;
};

const findUserByEmail = async (param) => {
  const user = await new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM users WHERE email='${param}'`,
      (err, results) => {
        if (err) reject(err);
        resolve(results);
      }
    );
  });
  return user;
};

const findUserById = async (param) => {
  const user = await new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM users WHERE id='${param}'`,
      (err, results) => {
        if (err) return reject(err);
        return resolve(results);
      }
    );
  });
  return user;
};

module.exports = { findUserByEmail, findUserById, findAllUsers };
