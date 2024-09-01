const sequelize = require('../DB/database-connection');
const { Sequelize, DataTypes} = require('sequelize');

const Recipe = sequelize.define('Recipe', {
    id: { 
      type: DataTypes.UUID, 
      defaultValue: DataTypes.UUIDV4, 
      primaryKey: true 
    },
    title: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    description: { 
      type: DataTypes.TEXT, 
      allowNull: true 
    },
    instructions: { 
      type: DataTypes.TEXT, 
      allowNull: false 
    },
    imagePath: { 
      type: DataTypes.STRING, 
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
    tableName: 'Recipes',
    timestamps: true,
    indexes: [
      {
        fields: ['id'],
      },
      {
        fields: ['user_id'],
      },
      {
        fields: ['cuisine_id'],
      },
    ]
});


// Define associations here
Recipe.associate = (models) => {
    Recipe.belongsTo(models.User, { foreignKey: 'user_id', as : 'creator' });
    Recipe.belongsTo(models.Cuisine, { foreignKey: 'cuisine_id', as: 'cuisine' });
    Recipe.hasMany(models.RecipeIngredient, { foreignKey: 'recipe_id', as: 'recipeIngredients' });
};

module.exports = Recipe;
