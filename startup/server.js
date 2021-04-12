require("dotenv").config();
const Hapi = require("@hapi/hapi");
require("../src/DB/connection");
const router = require("./router");

const init = async () => {
  const server = Hapi.Server({
    port: process.env.PORT || 5000,
    host: process.env.HOST,
  });
  router(server);

  await server.start();
  console.log(`Server is running on port ${process.env.PORT}`);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

module.exports = init;
