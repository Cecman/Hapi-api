const bcrypt = require("bcrypt");
const db = require("../../src/DB/connection");
const Joi = require("joi");
const Boom = require("@hapi/boom");

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  password: Joi.string()
    .pattern(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=\\S*$)[a-zA-Z0-9!@#$%^&*]{8,}"
      )
    )
    .message(
      "A password must not contain a whitespace and must contain 1 Uppercase, Number and a Special character(!@# etc.)"
    )
    .required(),
});

const validate = (request) => {
  return schema.validate(request);
};

const loginUser = {
  method: "POST",
  path: "/login",
  handler: async (request, h) => {
    const { error } = validate(request.payload);
    if (error) {
      return Boom.badRequest(error.details[0].message);
    }

    const user = await new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM users WHERE name='${request.payload.name}'`, //just a sample implementation, check for a unique value in the table (email)
        (err, results, fields) => {
          if (err) return reject(err);
          return resolve(results);
        }
      );
    });
    
    if (!user) {
      return Boom.badRequest("Invalid name or password");
    }
    console.log(user[0].password);
    const validPassword = await bcrypt.compare(
      request.payload.password,
      user[0].password
    );
    if (!validPassword) {
      return Boom.badRequest("Invalid name or password");
    }

    return h.response("Logged In");
  },
  options: {
    description: 'Login user',
    tags: ['api']
  }
};

module.exports = loginUser;
