const JWT = require("jsonwebtoken");
const { findAllUsers } = require("../../../src/DB/findUser");
const updateUserById = require("../../../src/DB/updateUser");
const createUser = require("../../../src/DB/createUser");
const deleteUserById = require("../../../src/DB/deleteUser");

const findUsersHandler = async (request, h) => {
  const users = await findAllUsers();
  return h.response(users);
};

const createUserHandler = async (request, h) => {
  const { name, email, password } = request.payload;
  const createdUser = await createUser(name, email, password);

  const token = JWT.sign(request.payload, process.env.API_KEY);

  return h.response(createdUser).header("x-auth-token", token);
};

const updateUserHandler = async (request, h) => {
  const id = request.params.id;
  const { name, email, password } = request.payload;

  const updated = await updateUserById(id, name, email, password);

  return h.response(updated);
};

const deleteUserHandler = async (request, h) => {
  const deletedUser = await deleteUserById(request.params.id);

  return h.response(deletedUser);
};

module.exports = {
  findUsersHandler,
  createUserHandler,
  updateUserHandler,
  deleteUserHandler,
};
