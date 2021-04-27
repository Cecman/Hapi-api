const findAdmin = require("../../src/DB/findAdmins");
const Boom = require("@hapi/boom");


const getAdmins = async (request, h) => {
  const admin = await findAdmin();
  if (admin.length < 1) {
    return Boom.notFound("There are currently no admins");
  }
  return h.response(admin);
};

module.exports = getAdmins;
