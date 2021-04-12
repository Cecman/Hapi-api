require("dotenv").config();
const Hapi = require("@hapi/hapi");
require("./DB/connection");
const { helloHandler, wellDoneHandler } = require("../api/routes");

const init = async () => {
  const server = Hapi.Server({
    port: process.env.PORT,
    host: process.env.HOST,
  });

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
