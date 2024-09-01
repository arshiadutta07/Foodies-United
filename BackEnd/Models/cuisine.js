const sequelize = require('../DB/database-connection');
const { Sequelize, DataTypes} = require('sequelize');

const Cuisine = sequelize.define('Cuisine', {
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
  tableName: 'Cuisines',
  timestamps: true,
});

// Define associations here
Cuisine.associate = (models) => {
    Cuisine.hasMany(models.Recipe, { foreignKey: 'cuisine_id', as : 'recipes' });
};

module.exports = Cuisine;