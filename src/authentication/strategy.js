require("dotenv").config();

const Boom = require("@hapi/boom");

const validate = async (decoded, request, h) => {
  const credentials = decoded;

  if (request.plugins["hapi-auth-jwt2"]) {
    credentials.extraInfo = request.plugins["hapi-auth-jwt2"].extraInfo;
    return { isValid: true, credentials };
  }
  return { isValid: false };
};

const keyFun = async (decoded) => {
  if (decoded) {
    const key = process.env.API_KEY;
    if (key) {
      return { key, additonal: "Extra info here if required" };
    } else {
      return Boom.unauthorized("Key not found");
    }
  } else {
    return Boom.badRequest("Invalid user");
  }
};

module.exports = { keyFun, validate };
