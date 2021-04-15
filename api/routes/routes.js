require("dotenv").config();
const validate = require("../../src/DB/models/user");
const asyncTcHandler = require("../../src/error");
const Boom = require("@hapi/boom");
const bcrypt = require("bcrypt");
const db = require("../../src/DB/connection");
const SALT = Number(process.env.SALT);

const getAllUsers = {
  method: "GET",
  path: "/",
  handler: async (request, h) => {
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
  },
  options: {
    description: "Get all users",
    tags: ["api"],
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
    
    const isUser = await new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM users WHERE email='${request.payload.email}'`,
        (err, result) => {
          if (err) return reject(err);
          return resolve(result);
        }
      );
    });
    console.log(isUser);

    if (isUser) {
      return Boom.unauthorized("A user with that email already exists");
    }
    const hashed = await bcrypt.hash(request.payload.password, SALT);
    const sql = "INSERT INTO users SET ?";
    const user = {
      name: request.payload.name,
      password: hashed,
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
  },
  options: {
    description: "Create a user",
    tags: ["api"],
  },
};

const updateUser = {
  method: "PATCH",
  path: "/{id}",
  handler: asyncTcHandler(async (request, h) => {
    const { error } = validate(request.payload);

    if (error) {
      return Boom.badRequest(error.details[0].message);
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
    return h.response(`User ${request.params.id} was updated`);
  }),
  options: {
    description: "Update user",
    tags: ["api"],
  },
};

const deleteUser = {
  method: "DELETE",
  path: "/{id}",
  handler: async (request, h) => {
    const userId = request.params.id;
    const user = await new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM users WHERE id=${userId} LIMIT 1`, //just a sample implementation, check for a unique value in the table (email)
        (err, results, fields) => {
          if (err) {
            return reject(err);
          }
          return resolve(results);
        }
      );
    });

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
  },
  options: {
    description: "Delete user",
    tags: ["api"],
  },
};

module.exports = { getAllUsers, createUser, updateUser, deleteUser };
