const {Sequelize, DataTypes} = require("sequelize");
const sequelize = require("../db/db")

const Admin = sequelize.define("admins", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type:  DataTypes.STRING,
      allowNull: false
    },
    password: {
        type:  DataTypes.STRING,
        allowNull: false
    }
 });
 
 sequelize.sync().then(() => {
    console.log('admins table created successfully!');
 }).catch((error) => {
    console.error('Unable to create admins table : ', error);
 });


 module.exports = Admin