const db = require("../../src/DB/connection");

const findUserByEmail = async(param) => {
  const user = await new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM users WHERE email='${param}'`,
      (err, results, fields) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    );
  });
  return user;
};

const findUserById = async (param) => {
  const user = await new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM users WHERE id='${param}'`,
      (err, results, fields) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    );
  });
  return user;
};

module.exports = { findUserByEmail, findUserById };
