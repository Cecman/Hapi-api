require("dotenv").config();
const Hapi = require("@hapi/hapi");
require("./DB/connection");
const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../api/routes");

const init = async () => {
  const server = Hapi.Server({
    port: process.env.PORT || 5000,
    host: process.env.HOST,
  });

  server.route(getAllUsers);
  server.route(createUser);
  server.route(updateUser);
  server.route(deleteUser);

  await server.start();
  console.log(`Server is running on port ${process.env.PORT}`);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

module.exports = init;
