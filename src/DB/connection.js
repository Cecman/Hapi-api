require("dotenv").config();
const { Sequelize } = require("sequelize");
// const mysql = require("mysql");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.HOST,
    dialect: "mysql",
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection to the DB is succesful");
  })
  .catch((err) => {
    console.log("Unable to connect to DB: ", err);
  });

// let con = mysql.createConnection({
//   host: process.env.HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME, //need previously created DB to work, otherwise run the commented query first and delete this line
// });

// con.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected to the DB!");
// });

// con.query(`CREATE DATABASE ${process.env.DB_NAME}`, (err, result) => {
//   if (err) throw err;
//   console.log("Database created");
// });

module.exports = sequelize;
