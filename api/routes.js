const sequelize = require("../src/DB/connection");
const Test = require("../src/DB/models/test");

const helloHandler = {
  method: "GET",
  path: "/",
  handler: async (request, h) => {
    const tests = await Test.findAll();
    return h.response(tests)
  },
};

const wellDoneHandler = {
  method: "POST",
  path: "/",
  handler: async (request, h) => {
    console.log(request.payload);
    const jane = await Test.create({ name: request.payload.name, address: request.payload.address });
    return h.response(jane);
  },
};

module.exports = { helloHandler, wellDoneHandler };
