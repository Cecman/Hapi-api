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
      db.query("SELECT * FROM users", (err, results, fields) => {
        if (err) return reject(err);
        return resolve(results);
      });
    });

    if (users.length < 1) {
      return Boom.notFound("There are no users registered");
    }
    return h.response(users);
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
    const hashed = await bcrypt.hash(request.payload.password, SALT);

    const user = {
      name: request.payload.name,
      password: hashed,
      address: request.payload.address,
    };

    const createdUser = await new Promise((resolve, reject) => {
      const sql = "INSERT INTO users set ?";
      db.query(sql, user, (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(`User was added in our DB`);
      });
    });
    return h.response(createdUser);
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

    const updateUser = {
      name: request.payload.name,
      address: request.payload.address,
      password: await bcrypt.hash(request.payload.password, SALT),
    };
    const sql = `UPDATE users SET ? WHERE id = '${request.params.id}'`;
    db.query(sql, updateUser, (err, result) => {
      if (err) throw err;
      console.log(result);
    });
    return h.response(`User ${request.params.id} was updated`);
  }),
};

const deleteUser = {
  method: "DELETE",
  path: "/{id}",
  handler: async (request, h) => {
    const userId = request.params.id;
    const user = await new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM users WHERE id=${userId}`, //just a sample implementation, check for a unique value in the table (email)
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
};

module.exports = { getAllUsers, createUser, updateUser, deleteUser };
