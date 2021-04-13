require("dotenv").config();
const { User, validate } = require("../src/DB/models/user");
const asyncTcHandler = require("../src/error");
const Boom = require("@hapi/boom");
const bcrypt = require("bcrypt");
const SALT = Number(process.env.SALT);

const getAllUsers = {
  method: "GET",
  path: "/",
  handler: asyncTcHandler(async (request, h) => {
    const users = await User.findAll();
    if (users.length < 1) {
      return Boom.notFound("There are no users registered");
    }
    return h.response(users);
  }),
};

const createUser = {
  method: "POST",
  path: "/",
  handler: asyncTcHandler(async (request, h) => {
    const { error } = validate(request.payload);

    if (error) {
      return Boom.badRequest(error.details[0].message);
    }

    const hashed = await bcrypt.hash(request.payload.password, SALT);
    // console.log(hashed);
    const user = await User.create({
      name: request.payload.name,
      password: hashed,
      address: request.payload.address,
    });

    return h.response(user);
  }),
};

const updateUser = {
  method: "PATCH",
  path: "/{id}",
  handler: asyncTcHandler(async (request, h) => {
    const { error } = validate(request.payload);

    if (error) {
      return Boom.badRequest(error.details[0].message);
    }

    await User.update(
      { name: request.payload.name, address: request.payload.address },
      {
        where: { id: request.params.id },
      }
    );
    //return updated document (if this query isnt performed
    //it returns a number of updated documents instead)
    const updated = await User.findByPk(request.params.id);
    return h.response(updated);
  }),
};

const deleteUser = {
  method: "DELETE",
  path: "/{id}",
  handler: asyncTcHandler(async (request, h) => {
    //performed in order to return the deleted document.
    //Otherwise only a number of documents(rows) is returned
    const deleted = await User.findOne({
      where: {
        id: request.params.id,
      },
    });

    if (!deleted) {
      return Boom.notFound("There was no document with the given ID in our DB");
    }

    //delete the document(row)
    await User.destroy({
      where: {
        id: request.params.id,
      },
    });
    return h.response(deleted);
  }),
};

module.exports = { getAllUsers, createUser, updateUser, deleteUser };
