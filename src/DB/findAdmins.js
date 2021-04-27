const db = require("./connection");

const findAdmin = async () => {
  const admin = await new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM admin_users`,
      (err, admin) => {
        if (err) reject(err);
        resolve(admin);
      }
    );
  });
  return admin;
};

module.exports = findAdmin;
