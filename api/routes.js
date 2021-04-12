const { Test, validate } = require("../src/DB/models/test");
const Boom = require("@hapi/boom");

const getAllUsers = {
  method: "GET",
  path: "/",
  handler: async (request, h) => {
    try {
      const tests = await Test.findAll();
      if (tests.length < 1) {
        return Boom.notFound("There are no users registered");
      }
      return h.response(tests);
    } catch (err) {
      return Boom.badImplementation(err);
    }
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

    try {
      const jane = await Test.create({
        name: request.payload.name,
        address: request.payload.address,
      });
      return h.response(jane);
    } catch (err) {
      return Boom.badImplementation(err);
    }
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

    try {
      await Test.update(
        { address: request.payload.address },
        {
          where: { id: request.params.id },
        }
      );
      //return updated document (if this query isnt performed it return a number of updated documents instead)
      const updated = await Test.findByPk(request.params.id);
      return h.response(updated);
    } catch (err) {
      return Boom.badImplementation(err);
    }
  },
};

const deleteUser = {
  method: "DELETE",
  path: "/{id}",
  handler: async (request, h) => {
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
    try {
      await Test.destroy({
        where: {
          id: request.params.id,
        },
      });
      return h.response(deleted);
    } catch (err) {
      return Boom.badImplementation(err);
    }
  },
};

module.exports = { getAllUsers, createUser, updateUser, deleteUser };
