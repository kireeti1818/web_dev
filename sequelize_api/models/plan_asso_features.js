// associations.js
const Plan = require('./plans');
const PlanFeatures = require('./plan_features');

Plan.hasMany(PlanFeatures, {
  foreignKey: 'plan_id',
  as: 'features'
});
PlanFeatures.belongsTo(Plan, {
  foreignKey: 'plan_id'
});

module.exports = { Plan, PlanFeatures };
