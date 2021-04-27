const {
  getAllUsers,
  postUser,
  updateUser,
  deleteUser,
} = require("../api/routes/user");
const loginUser = require("../api/routes/login");
const findAdmin = require("../api/routes/admin");

module.exports = function (server) {
  server.route(getAllUsers);
  server.route(postUser);
  server.route(updateUser);
  server.route(deleteUser);
  server.route(loginUser);
  server.route(findAdmin);
};
