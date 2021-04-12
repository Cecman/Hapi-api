const Boom = require("@hapi/boom");

function asyncTcHandler(handler) {
  return async (request, h) => {
    try {
      return await handler(request, h);
    } catch (err) {
      return Boom.badImplementation(err);
    }
  };
}

module.exports = asyncTcHandler;
