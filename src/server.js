require("dotenv").config();
const Hapi = require("@hapi/hapi");
// const con = require("./DB/connection");
const Sequelize = require("./DB/connection");
const { helloHandler, wellDoneHandler } = require("../api/routes");

const init = async () => {
  const server = Hapi.Server({
    port: process.env.PORT || 5000,
    host: process.env.HOST,
  });

  // const mysql = require("mysql");

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

  server.route(helloHandler);
  server.route(wellDoneHandler);

  await server.start();
  console.log(`Server is running on port ${process.env.PORT}`);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

module.exports = init;
