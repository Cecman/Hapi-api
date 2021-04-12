const { Test, validate } = require("../src/DB/models/test");
const Boom = require("@hapi/boom");

const getAllUsersHandler = {
  method: "GET",
  path: "/",
  handler: async (request, h) => {
    const tests = await Test.findAll();
    if (tests.length < 1) {
      return Boom.notFound("There are no users registered");
    }
    return h.response(tests);
  },
};

const createUserHandler = {
  method: "POST",
  path: "/",
  handler: async (request, h) => {
    const { error } = validate(request.payload);

    if (error) {
      return Boom.badRequest(error.details[0].message);
    }

    const jane = await Test.create({
      name: request.payload.name,
      address: request.payload.address,
    });
    return h.response(jane);
  },
};

module.exports = { getAllUsersHandler, createUserHandler };
