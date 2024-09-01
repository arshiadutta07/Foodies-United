const sequelize = require('../DB/database-connection');
const User = require('./user');
const EmailVerificationInfo = require('./emailVerificationDetails');
const Recipe = require('./recipe');
const Ingredient = require('./ingredients');
const Category = require('./category');
const RecipeIngredient = require('./recipeIngredient');
const Cuisine = require('./cuisine');

// Initialize models
const models = {
  User,
  EmailVerificationInfo,
  Recipe,
  Ingredient,
  Category,
  RecipeIngredient,
  Cuisine
};

// Define associations
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

module.exports = {
  sequelize,
  ...models,
};
