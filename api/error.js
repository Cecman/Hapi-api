const Boom = require("@hapi/boom");

function asyncWrapHandler(handler) {
  return async (request, h) => {
    try {
      return handler(request, h);
    } catch (err) {
      return Boom.badImplementation(err);
    }
  };
}

module.exports = asyncWrapHandler;
