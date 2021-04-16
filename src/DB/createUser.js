const db = require("../DB/connection");
const bcrypt = require("bcrypt");
const SALT = Number(process.env.SALT);

const createUser = async (name, email, password) => {
  const sql = "INSERT INTO users SET ?";
  const user = {
    name: name,
    password: await bcrypt.hash(password, SALT),
    email: email,
  };

  const createdUser = await new Promise((resolve, reject) => {
    db.query(sql, user, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve("Success. You can now log in.");
    });
  });
  return createdUser;
};

module.exports = createUser;
