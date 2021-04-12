const { Test, validate } = require("../src/DB/models/test");
const asyncWrapHandler = require("./error");
const Boom = require("@hapi/boom");

const getAllUsers = {
  method: "GET",
  path: "/",
  handler: asyncWrapHandler(async (request, h) => {
    const tests = await Test.findAll();
    console.log(tests);
    if (tests.length < 1) {
      return Boom.notFound("There are no users registered");
    }
    return h.response(tests);
  }),
};

const createUser = {
  method: "POST",
  path: "/",
  handler: asyncWrapHandler(async (request, h) => {
    const { error } = validate(request.payload);

    if (error) {
      return Boom.badRequest(error.details[0].message);
    }
    const jane = await Test.create({
      name: request.payload.name,
      address: request.payload.address,
    });
    return h.response(jane);
  }),
};

const updateUser = {
  method: "PATCH",
  path: "/{id}",
  handler: asyncWrapHandler(async (request, h) => {
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
  }),
};

const deleteUser = {
  method: "DELETE",
  path: "/{id}",
  handler: asyncWrapHandler(async (request, h) => {
    //performed in order to return the deleted document. Otherwise only a number of documents(rows) is returned
    const deleted = await Test.findOne({
      where: {
        id: request.params.id,
      },
    });

    if (!deleted) {
      return Boom.notFound("There was no document with the given ID in our DB");
    }

    //delete the document(row)
    await Test.destroy({
      where: {
        id: request.params.id,
      },
    });
    return h.response(deleted);
  }),
};

module.exports = { getAllUsers, createUser, updateUser, deleteUser };
