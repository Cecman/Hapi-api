const findAdmin = require("../../src/DB/findAdmins");

const getAdmins = async (request, h) => {
  const admin = await findAdmin();
  return h.response(admin);
};

module.exports = getAdmins;
