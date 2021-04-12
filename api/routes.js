const { Test, validate } = require("../src/DB/models/test");
const Boom = require("@hapi/boom");

const getAllUsers = {
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

const createUser = {
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

const updateUser = {
  method: "PATCH",
  path: "/{id}",
  handler: async (request, h) => {
    const { error } = validate(request.payload);

    if (error) {
      return Boom.badRequest(error.details[0].message);
    }

    await Test.update(
      { address: request.payload.address },
      {
        where: { id: request.params.id },
      }
    );
    //return updated document (if this query isnt performed it return a number of updated documents instead)
    const updated = await Test.findByPk(request.params.id);
    return h.response(updated);
  },
};

module.exports = { getAllUsers, createUser, updateUser };
