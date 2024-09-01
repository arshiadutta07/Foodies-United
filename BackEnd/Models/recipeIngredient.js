const sequelize = require('../DB/database-connection');
const { Sequelize, DataTypes} = require('sequelize');

const RecipeIngredient = sequelize.define('RecipeIngredient', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  }
}, {
  tableName: 'RecipeIngredients',
  timestamps: true,
  indexes: [
    {
      fields: ['recipe_id'],
    },
    {
      fields: ['ingredient_id'],
    }
  ]
});

// Define associations here
RecipeIngredient.associate = (models) => {
    RecipeIngredient.belongsTo(models.Recipe, { foreignKey: 'recipe_id', as: 'recipe' });
    RecipeIngredient.belongsTo(models.Ingredient, { foreignKey: 'ingredient_id', as: 'ingredient' });
};

module.exports = RecipeIngredient;
