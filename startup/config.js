const HapiSwagger = require("hapi-swagger");
const Inert = require("@hapi/inert");
const Vision = require("@hapi/vision");
const jwtAuth = require("hapi-auth-jwt2");
const { validate, keyFun } = require("../src/authentication/strategy");

module.exports = async function (server) {
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
};
