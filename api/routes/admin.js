require("dotenv").config();
const getAdmins = require("../handlers/adminHandlers");

const getAdmin = {
  method: "GET",
  path: "/admin",
  options: {
    auth: false,
  },
  handler: getAdmins,
};

module.exports = getAdmin;
