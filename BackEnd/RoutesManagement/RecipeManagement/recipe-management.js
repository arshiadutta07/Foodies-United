const bcrypt = require("bcrypt");
let {User, Recipe, RecipeIngredient, Ingredient, Cuisine} = require("../../Models/modelCollectionConfig");
const { Op } = require('sequelize');

let getAllUsers = function(pageNo) {
    return new Promise(async function(resolve, reject) {
        try {
            let limit = 5;
            let result = {};
            let res = await User.findAll({
                attributes : ["id", "displayName", "userName", "email", "role"],
                limit : limit,
                offset : (pageNo - 1) * limit,
              });
            result.data = res;
            resolve({success: true, data : result});
        }
        catch(ex) {
            reject(ex);
        }
    })
}

let createRecipe = function(recipeObject, imagePath) {
    return new Promise(async function(resolve, reject) {
        try {
          const { title, description, instructions, ingredients, userId, cuisineId } = recipeObject;
          let ingredientArr;
          let result = {};
          let data = await Recipe.create({
            title,
            description,
            instructions,
            user_id: userId,
            cuisine_id: cuisineId,
            imagePath: imagePath ? imagePath.path : null
          });
          ingredientArr = JSON.parse(ingredients);
          ingredientArr.map(async(ingredient)=>{
            await RecipeIngredient.create({
              recipe_id : data.id,
              ingredient_id : ingredient
            })
          })
          result.data = data;
          resolve(result);
        }
        catch(ex) {
            reject(ex);
        }
    })
}

let validateIngredients = function(ingredients) {
  return new Promise(async function(resolve, reject) {
      try {
          let ingredientArr = JSON.parse(ingredients);
          let ingredientsExist = await Ingredient.findAll({
            where: {
                id: ingredientArr
            }
          });
          if(ingredientsExist.length !== ingredientArr.length) {
            resolve(false);
          }
          resolve(true);
      }
      catch(ex) {
          reject(ex);
      }
  })
}

let getAllRecipes = function() {
  return new Promise(async function(resolve, reject) {
      try {
        let recipes = await Recipe.findAll({
          include: [
              {
                  model: Cuisine,
                  attributes: ['name'],
                  as: 'cuisine'
              },
              {
                  model: User,
                  attributes: ['userName'],
                  as: 'creator'
              },
              {
                model: RecipeIngredient,
                as: 'recipeIngredients',
                attributes: ["ingredient_id"],
                include: [
                    {
                        model: Ingredient,
                        as: 'ingredient',
                        attributes: ['name'],
                    }
                ]
              }
          ],
          order: [['createdAt', 'DESC']],
        });
        
        resolve(recipes);
    }
    catch(ex) {
      reject(ex);
    }
  })
}

let getParticularRecipe = function(id) {
  return new Promise(async function(resolve, reject) {
      try {
        let recipe = await Recipe.findOne({
          where: { id },
          include: [
              {
                  model: Cuisine,
                  attributes: ['name'],
                  as: 'cuisine'
              },
              {
                  model: User,
                  attributes: ['userName'],
                  as: 'creator'
              },
              {
                model: RecipeIngredient,
                as: 'recipeIngredients',
                attributes: ["ingredient_id"],
                include: [
                    {
                        model: Ingredient,
                        as: 'ingredient',
                        attributes: ['name'],
                    }
                ]
              }
          ],
        });
        
        resolve(recipe);
    }
    catch(ex) {
      reject(ex);
    }
  })
}

let checkIfRecipeExists = function(id) {
  return new Promise(async function(resolve, reject) {
      try {
        const recipe = await Recipe.findOne({ where: { id } });
        if (!recipe) {
            resolve(false);
        }        
        resolve(true);
    }
    catch(ex) {
      reject(ex);
    }
  })
}

let updateRecipe = function(id, updatedRecipe, imagePath) {
  return new Promise(async function(resolve, reject) {
      try {

        const recipe = await Recipe.findOne({ where: { id } });    

        recipe.title = updatedRecipe.title || recipe.title;
        recipe.description = updatedRecipe.description || recipe.description;
        recipe.instructions = updatedRecipe.instructions || recipe.instructions;
        recipe.cuisine_id = updatedRecipe.cuisine_id || recipe.cuisine_id;
        recipe.user_id = updatedRecipe.user_id || recipe.user_id;

        if (imagePath) {
          recipe.imagePath = imagePath ? imagePath.path : null
        }

        await recipe.save();

        if (updatedRecipe.ingredients) {
          await RecipeIngredient.destroy({ where: { recipe_id: recipe.id } });

          const ingredientEntries = JSON.parse(updatedRecipe.ingredients);
          for (const entry of ingredientEntries) {
              await RecipeIngredient.create({
                  recipe_id: recipe.id,
                  ingredient_id: entry
              });
          }
        }
        
        resolve(recipe);
    }
    catch(ex) {
      reject(ex);
    }
  })
}

let deleteRecipe = function(id) {
  return new Promise(async function(resolve, reject) {
      try {

        const recipe = await Recipe.findOne({ where: { id } });    

        await RecipeIngredient.destroy({ where: { recipe_id: recipe.id } });
        await recipe.destroy();
        
        resolve();
    }
    catch(ex) {
      reject(ex);
    }
  })
}

function transformRecipeInstructions(instructions) {
  return instructions.split('\n').map((step, index) => `${index + 1}. ${step}`).join('\n');
}

let getAllIngredients = function() {
  return new Promise(async function(resolve, reject) {
      try {
          let res = await Ingredient.findAll();
          resolve({success: true, data : res});
      }
      catch(ex) {
          reject(ex);
      }
  })
}

let getAllCuisines = function() {
  return new Promise(async function(resolve, reject) {
      try {
          let res = await Cuisine.findAll();
          resolve({success: true, data : res});
      }
      catch(ex) {
          reject(ex);
      }
  })
}

module.exports = {
    getAllUsers,
    createRecipe,
    validateIngredients,
    getAllRecipes,
    transformRecipeInstructions,
    getParticularRecipe,
    checkIfRecipeExists,
    updateRecipe,
    deleteRecipe,
    getAllIngredients,
    getAllCuisines
}