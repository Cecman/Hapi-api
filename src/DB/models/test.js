const { DataTypes } = require("sequelize");
const sequelize = require("../connection");
const Joi = require("joi");

const Test = sequelize.define("Test", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const schema = Joi.object({
  name: Joi.string().min(3).max(255).required(),
  address: Joi.string().min(4).max(255),
});

const validate = (user) => {
  return schema.validate(user);
};

Test.sync();
module.exports = { Test, validate };
