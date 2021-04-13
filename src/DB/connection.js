require("dotenv").config();
const mysql = require("mysql");

let con = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

con.connect((err) => {
  if (err) throw err;
  console.log("Connected to DB");
});

// const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     host: process.env.HOST,
//     dialect: "mysql",
//   }
// );

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log("Connection to the DB is succesful");
//   })
//   .catch((err) => {
//     console.log("Unable to connect to DB: ", err);
//   });

module.exports = con;
