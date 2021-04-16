const db = require("../DB/connection");
const bcrypt = require("bcrypt");
const SALT = Number(process.env.SALT);

const updateUserById = async (id, name, email, password) => {
  const sql = `UPDATE users SET ? WHERE id = '${id}'`;
  const updateUser = {
    name: name,
    email: email,
    password: await bcrypt.hash(password, SALT),
  };

  const updated = await new Promise((resolve, reject) => {
    db.query(sql, updateUser, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
  return updated;
};

module.exports = updateUserById;
