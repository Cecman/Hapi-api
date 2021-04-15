require("dotenv").config();
const validate = require("../../src/DB/models/user");
const asyncTcHandler = require("../../src/error");
const Boom = require("@hapi/boom");
const bcrypt = require("bcrypt");
const db = require("../../src/DB/connection");
const SALT = Number(process.env.SALT);
const { findUserById, findUserByEmail } = require("../../src/DB/findUser");

const getAllUsers = {
  method: "GET",
  path: "/",
  options: {
    description: "Get all users",
    tags: ["api"],
    handler: asyncTcHandler(async (request, h) => {
      const users = await new Promise((resolve, reject) => {
        db.query("SELECT name, email FROM users", (err, results, fields) => {
          if (err) return reject(err);
          return resolve(results);
        });
      });

      if (users.length < 1) {
        return Boom.notFound("There are no users registered");
      }
      return h.response(users);
    }),
  },
};

const createUser = {
  method: "POST",
  path: "/",
  options: {
    description: "Create a user",
    tags: ["api"],
    handler: asyncTcHandler(async (request, h) => {
      const { error } = validate(request.payload);
      if (error) {
        return Boom.badRequest(error.details[0].message);
      }

      const isUser = await findUserByEmail(request.payload.email);
      if (isUser.length === 1) {
        return Boom.unauthorized("A user with that email already exists");
      }

      const sql = "INSERT INTO users SET ?";
      const user = {
        name: request.payload.name,
        password: await bcrypt.hash(request.payload.password, SALT),
        email: request.payload.email,
      };

      const createdUser = await new Promise((resolve, reject) => {
        db.query(sql, user, (err, result) => {
          if (err) {
            return reject(err);
          }
          return resolve(`User was added in our DB`);
        });
      });
      return h.response(createdUser);
    }),
  },
};

const updateUser = {
  method: "PATCH",
  path: "/{id}",
  options: {
    description: "Update user",
    tags: ["api"],
    handler: asyncTcHandler(async (request, h) => {
      const { error } = validate(request.payload);
      if (error) {
        return Boom.badRequest(error.details[0].message);
      }

      const user = await findUserById(request.params.id);
      if (user.length < 1) {
        return Boom.notFound("There is no user with the given ID");
      }

      const isEmailUsed = await findUserByEmail(request.payload.email);
      if (isEmailUsed.length === 1) {
        return Boom.unauthorized("A user with that email already exists");
      }

      const sql = `UPDATE users SET ? WHERE id = '${request.params.id}'`;
      const updateUser = {
        name: request.payload.name,
        email: request.payload.email,
        password: await bcrypt.hash(request.payload.password, SALT),
      };

      db.query(sql, updateUser, (err, result) => {
        if (err) throw err;
        console.log(result);
      });
      return h.response(`User ${user[0].name} was updated`);
    }),
  },
};

const deleteUser = {
  method: "DELETE",
  path: "/{id}",
  options: {
    description: "Delete user",
    tags: ["api"],
    handler: asyncTcHandler(async (request, h) => {
      const userId = request.params.id;
      const user = await findUserById(userId);

      if (user.length < 1) {
        return Boom.notFound(
          "The user with the given ID does not exist in our DB"
        );
      }

      const sql = `DELETE FROM users WHERE id='${userId}'`;
      const deletedUser = await new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
          if (err) return reject(err);
          return resolve(result);
        });
      });
      return h.response(deletedUser);
    }),
  },
};

module.exports = { getAllUsers, createUser, updateUser, deleteUser };
