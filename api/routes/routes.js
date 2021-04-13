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
      db.query(sql, user, (err, result, fields) => {
        if (err) {
          return reject(err);
        }
        return resolve(`User was added in our DB`);
      });
    });
    return h.response(createdUser);
  },
};

// const getAllUsers = {
//   method: "GET",
//   path: "/",
//   handler: asyncTcHandler(async (request, h) => {
//     const users = await User.findAll();
//     if (users.length < 1) {
//       return Boom.notFound("There are no users registered");
//     }
//     return h.response(users);
//   }),
// };

// const createUser = {
//   method: "POST",
//   path: "/",
//   handler: asyncTcHandler(async (request, h) => {
//     const { error } = validate(request.payload);

//     if (error) {
//       return Boom.badRequest(error.details[0].message);
//     }

//     const hashed = await bcrypt.hash(request.payload.password, SALT);
//     // console.log(hashed);
//     const user = await User.create({
//       name: request.payload.name,
//       password: hashed,
//       address: request.payload.address,
//     });

//     return h.response(user);
//   }),
// };

// const updateUser = {
//   method: "PATCH",
//   path: "/{id}",
//   handler: asyncTcHandler(async (request, h) => {
//     const { error } = validate(request.payload);

//     if (error) {
//       return Boom.badRequest(error.details[0].message);
//     }

//     await User.update(
//       { name: request.payload.name, address: request.payload.address },
//       {
//         where: { id: request.params.id },
//       }
//     );
//     //return updated document (if this query isnt performed
//     //it returns a number of updated documents instead)
//     const updated = await User.findByPk(request.params.id);
//     return h.response(updated);
//   }),
// };

// const deleteUser = {
//   method: "DELETE",
//   path: "/{id}",
//   handler: asyncTcHandler(async (request, h) => {
//     //performed in order to return the deleted document.
//     //Otherwise only a number of documents(rows) is returned
//     const deleted = await User.findOne({
//       where: {
//         id: request.params.id,
//       },
//     });

//     if (!deleted) {
//       return Boom.notFound("There was no document with the given ID in our DB");
//     }

//     //delete the document(row)
//     await User.destroy({
//       where: {
//         id: request.params.id,
//       },
//     });
//     return h.response(deleted);
//   }),
// };

// module.exports = { getAllUsers, createUser, updateUser, deleteUser };
module.exports = { getAllUsers, createUser };
