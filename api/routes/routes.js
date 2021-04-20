require("dotenv").config();
const JWT = require("jsonwebtoken");
const asyncTcHandler = require("../../src/error");
const { findAllUsers } = require("../../src/DB/findUser");
const updateUserById = require("../../src/DB/updateUser");
const createUser = require("../../src/DB/createUser");
const deleteUserById = require("../../src/DB/deleteUser");
const verifyUserInput = require("../../src/authentication/verifyUserInput");
const {
  verifyUserEmail,
  verifyUserId,
} = require("../../src/authentication/validateUserCredentials");
const getAllUsers = {
  method: "GET",
  path: "/",
  options: {
    description: "Get all users",
    tags: ["api"],
    handler: asyncTcHandler(async (request, h) => {
      const users = await findAllUsers();
      return h.response(users);
    }),
  },
};

const postUser = {
  method: "POST",
  path: "/",
  options: {
    description: "Create a user",
    tags: ["api"],
    auth: false,
    pre: [{ method: verifyUserInput, assign: "userInput" }],
    handler: asyncTcHandler(async (request, h) => {
      const { name, email, password } = request.payload;
      const createdUser = await createUser(name, email, password);

      const token = JWT.sign(request.payload, process.env.API_KEY);

      return h.response(createdUser).header("x-auth-token", token);
    }),
  },
};

const updateUser = {
  method: "PATCH",
  path: "/{id}",
  options: {
    description: "Update user",
    tags: ["api"],
    auth: "jwt",
    pre: [
      { method: verifyUserInput, assign: "userInput" },
      { method: verifyUserId, assign: "userId" },
      { method: verifyUserEmail, assign: "userEmail" },
    ],
    handler: asyncTcHandler(async (request, h) => {
      const id = request.params.id;
      const { name, email, password } = request.payload;

      const updated = await updateUserById(id, name, email, password);

      return h.response(updated);
    }),
  },
};

const deleteUser = {
  method: "DELETE",
  path: "/{id}",
  options: {
    description: "Delete user",
    tags: ["api"],
    auth: "jwt",
    pre: [
      { method: verifyUserId, assign: "userId" },
      { method: verifyUserEmail, assign: "userEmail" },
    ],
    handler: asyncTcHandler(async (request, h) => {
      const deletedUser = await deleteUserById(request.params.id);

      return h.response(deletedUser);
    }),
  },
};

module.exports = { getAllUsers, postUser, updateUser, deleteUser };
