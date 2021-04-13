const { DataTypes } = require("sequelize");
// const sequelize = require("../connection");
// const Joi = require("joi");

// const User = sequelize.define("User", {
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   password: {
//     type: DataTypes.STRING,
//   },
//   address: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
// });

// const schema = Joi.object({
//   name: Joi.string().min(3).max(30).required(),
//   password: Joi.string()
//     .pattern(
//       new RegExp(
//         "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=\\S*$)[a-zA-Z0-9!@#$%^&*]{8,}"
//       )
//     )
//     .message(
//       "A password must not contain a whitespace and must contain 1 Uppercase, Number and a Special character(!@# etc.)"
//     ).required(),
//   address: Joi.string().min(4).max(100),
// });

// const validate = (user) => {
//   return schema.validate(user);
// };

// User.sync();
// module.exports = { User, validate };
