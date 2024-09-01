const sequelize = require('../DB/database-connection');
const { Sequelize, DataTypes} = require('sequelize');

const Category = sequelize.define('Category', {
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
    tableName: 'Categories',
    timestamps: true,
  });
  
// Define associations here
Category.associate = (models) => {
    Category.hasMany(models.Ingredient, { foreignKey: 'category_id', as : 'ingredients' });
};

module.exports = Category;