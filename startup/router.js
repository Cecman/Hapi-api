const { getAllUsers, createUser } = require("../api/routes/routes");
const loginUser = require("../api/routes/login");
module.exports = function (server) {
  server.route(getAllUsers);
  server.route(createUser);
  // server.route(updateUser);
  // server.route(deleteUser);

  server.route(loginUser);
};
