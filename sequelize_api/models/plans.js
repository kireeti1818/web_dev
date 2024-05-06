const {Sequelize, DataTypes} = require("sequelize");
const sequelize = require("../db/db")

const Plan = sequelize.define("plans", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    planName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    devices: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    duration_in_years: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price : {
        type: DataTypes.INTEGER,
        allowNull: false
    }
 });
 
sequelize.sync();


module.exports = Plan