const { DataTypes } = require("sequelize");
const sequelize = require("../db/db");

const PlanFeatures = sequelize.define("plan_features", {
  d: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  plan_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'plans', 
      key: 'id',
    },
    onDelete: 'CASCADE'
  },
  feature_desc: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  indexes: [{
    unique: true,
    fields: ['plan_id', 'feature_desc']
  }]
});


sequelize.sync();

module.exports = PlanFeatures;
