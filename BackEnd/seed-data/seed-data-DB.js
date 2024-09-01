
const models = require('../Models/modelCollectionConfig');
const cuisines = require('./cuisine-seed-data');
const categories = require('./category-seed-data');
const ingredients = require('./ingredients-seed-data');

async function seedDataInDB() {
    try {
        await models.Category.bulkCreate(categories);
        await models.Ingredient.bulkCreate(ingredients);
        await models.Cuisine.bulkCreate(cuisines);
    } catch(ex) {
        console.log(ex);
        return ex;
    }
}

module.exports = seedDataInDB;