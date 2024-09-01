const sequelize = require('../DB/database-connection');
const { Sequelize, DataTypes} = require('sequelize');

const Ingredient = sequelize.define('Ingredient', {
  id: { 
    type: DataTypes.UUID, 
    defaultValue: DataTypes.UUIDV4, 
    primaryKey: true 
  },
  name: { 
    type: DataTypes.STRING, 
    allowNull: false, 
    unique: true 
  },
  description: { 
    type: DataTypes.TEXT, 
    allowNull: true 
  },
  createdAt: { 
    type: DataTypes.DATE, 
    defaultValue: DataTypes.NOW 
  },
  updatedAt: { 
    type: DataTypes.DATE, 
    defaultValue: DataTypes.NOW, 
    onUpdate: DataTypes.NOW 
  },
}, {
  tableName: 'Ingredients',
  timestamps: true,
});

// Define associations here
Ingredient.associate = (models) => {
    Ingredient.belongsTo(models.Category, { foreignKey: 'category_id', as : 'category' });
    Ingredient.hasMany(models.RecipeIngredient, { foreignKey: 'ingredient_id', as: 'ingredientRecipes' });
};

module.exports = Ingredient;
