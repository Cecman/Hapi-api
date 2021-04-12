const helloHandler = {
  method: "GET",
  path: "/",
  handler: (request, h) => {
    return "Hello World";
  },
};

const wellDoneHandler = {
  method: "POST",
  path: "/",
  handler: (request, h) => {
    console.log(request.url);
    return request.payload;
  },
};

module.exports = { helloHandler, wellDoneHandler };




