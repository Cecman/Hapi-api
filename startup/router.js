const getUsers = require("../api/routes/routes");
// const {
//   getAllUsers,
//   createUser,
//   updateUser,
//   deleteUser,
// } = require("../api/routes/routes");
const loginUser = require("../api/routes/login");
module.exports = function (server) {
  // server.route(getAllUsers);
  // server.route(createUser);
  // server.route(updateUser);
  // server.route(deleteUser);
  server.route(getUsers);
  server.route(loginUser);
};
