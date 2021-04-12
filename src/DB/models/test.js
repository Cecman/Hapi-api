const { DataTypes } = require("sequelize");
const sequelize = require("../connection");

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

Test.sync();
module.exports = Test;
