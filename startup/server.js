const Hapi = require("@hapi/hapi");
require("dotenv").config();
require("../src/DB/connection");
const router = require("./router");
const HapiSwagger = require("hapi-swagger");
const Inert = require("@hapi/inert");
const Vision = require("@hapi/vision");
const jwtAuth = require("hapi-auth-jwt2");
const { validate, keyFun } = require("../src/authentication/strategy");

const init = async () => {
  const server = Hapi.Server({
    port: process.env.PORT || 5000,
    host: process.env.HOST,
  });

  const swaggerOptions = {
    info: {
      title: "API Documentation",
    },
  };

  await server.register([
    jwtAuth,
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions,
    },
  ]);
  server.auth.strategy("jwt", "jwt", {
    key: keyFun,
    validate,
  });
  server.auth.default("jwt");

  router(server);

  await server.start();
  console.log(`Server is running on port ${process.env.PORT}`);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

module.exports = init;
