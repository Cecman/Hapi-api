require("dotenv").config();
const validate = require("../../src/DB/models/user");
const asyncTcHandler = require("../../src/error");
const Boom = require("@hapi/boom");
const {
  findUserById,
  findUserByEmail,
  findAllUsers,
} = require("../../src/DB/findUser");
const updateUserById = require("../../src/DB/updateUser");
const createUser = require("../../src/DB/createUser");
const deleteUserById = require("../../src/DB/deleteUser");
const JWT = require("jsonwebtoken");
const verifyUserInput = require("../../src/authentication/verifyUserInput");
const verifyUser = require("../../src/authentication/validateLoginCredentials");

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

      const isUser = await findUserByEmail(email);
      if (isUser.length >= 1) {
        return Boom.badRequest("A user with that email already exists");
      }

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
    handler: asyncTcHandler(async (request, h) => {
      console.log(request.auth.credentials);
      const { error } = validate(request.payload);
      if (error) {
        return Boom.badRequest(error.details[0].message);
      }
      const id = request.params.id;
      const { name, email, password } = request.payload;

      const user = await findUserById(id);
      if (user.length < 1) {
        return Boom.notFound("There is no user with the given ID");
      }

      const isEmailUsed = await findUserByEmail(email);
      if (isEmailUsed.length === 1) {
        return Boom.badRequest("A user with that email already exists");
      }

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
    handler: asyncTcHandler(async (request, h) => {
      const userId = request.params.id;
      const user = await findUserById(userId);

      if (user.length < 1) {
        return Boom.notFound(
          "The user with the given ID does not exist in our DB"
        );
      }
      const deletedUser = await deleteUserById(userId);
      return h.response(deletedUser);
    }),
  },
};

module.exports = { getAllUsers, postUser, updateUser, deleteUser };
