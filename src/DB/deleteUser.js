const db = require("../DB/connection");

const deleteUserById = async (id) => {
  const sql = `DELETE FROM users WHERE id='${id}'`;
  const deletedUser = await new Promise((resolve, reject) => {
    db.query(sql, (err, result) => {
      if (err) reject(err);
      resolve(`User with id ${id} was succesfuly deleted.`);
    });
  });
  return deletedUser;
};

module.exports = deleteUserById;
