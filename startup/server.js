const Hapi = require("@hapi/hapi");
require("dotenv").config();
require("../src/DB/connection");
const router = require("./router");
const config = require("./config");

const init = async () => {
  const server = Hapi.Server({
    port: process.env.PORT || 5000,
    host: process.env.HOST,
  });

  await config(server);
  router(server);

  await server.start();
  console.log(`Server is running on port ${process.env.PORT}`);

};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

module.exports = init;
