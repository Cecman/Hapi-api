require("dotenv").config();
const asyncTcHandler = require("../../src/error");
const verifyUserInput = require("../../src/authentication/verifyUserInput");
const {
  verifyUserEmail,
  verifyUserId,
} = require("../../src/authentication/validateUserCredentials");
const {
  findUsersHandler,
  createUserHandler,
  updateUserHandler,
  deleteUserHandler,
} = require("../handlers/userHandlers");

const getAllUsers = {
  method: "GET",
  path: "/",
  options: {
    description: "Get all users",
    tags: ["api"],
    auth: false,
    handler: asyncTcHandler(findUsersHandler),
  },
};

const postUser = {
  method: "POST",
  path: "/",
  options: {
    description: "Create a user",
    tags: ["api"],
    auth: false,
    pre: [
      { method: verifyUserInput, assign: "userInput" },
      { method: verifyUserEmail, assign: "userEmail" },
    ],
    handler: asyncTcHandler(createUserHandler),
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
    handler: asyncTcHandler(updateUserHandler),
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
    handler: asyncTcHandler(deleteUserHandler),
  },
};

module.exports = { getAllUsers, postUser, updateUser, deleteUser };
