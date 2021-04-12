const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../api/routes");

module.exports = function (server) {
  server.route(getAllUsers);
  server.route(createUser);
  server.route(updateUser);
  server.route(deleteUser);
};
