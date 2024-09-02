const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { recipeSchema } = require('../../Validations/validation');
const {auth, authorizeRoles} = require("../../Middlewares/auth-middleware");
const {getAllUsers, createRecipe, validateIngredients, getAllRecipes, transformRecipeInstructions, getParticularRecipe, checkIfRecipeExists, updateRecipe, deleteRecipe, getAllIngredients, getAllCuisines} = require('../../RoutesManagement/RecipeManagement/recipe-management');

// Configure Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  
// Initialize Multer with the defined storage
const upload = multer({ storage: storage });

//Get All Users
router.get("/users", auth, authorizeRoles(['SuperAdmin']), async(req, res) => {
    let result = {};
    try {
        let users = await getAllUsers(req.query.page);
        result.data = users.data;
        res.status(200).send(result);
    }
    catch(ex) {
        console.log(ex);
        result.error = `Internal Server Error - ${ex.message ? ex.message : ex}`;
        res.status(500).send(result);
    }
})

router.post("/createRecipe", auth, authorizeRoles(['SuperAdmin', 'Admin', 'Client']), upload.single('image'), async(req, res) => {
    let result = {};
    let statusCode = 201;
    try {
        let isValidInfo = recipeSchema.validate(req.body);
        // Step 1: Validate the request body with Joi
        if(isValidInfo.error) {
            console.log(isValidInfo.error);
            result.validationError = "Recipe Contents not valid";
            return res.status(400).send(result); 
        }

        // Step 2: Verify that all ingredients exist in the database
        let isValidIngredients = await validateIngredients(req.body.ingredients);
        console.log(isValidIngredients );
        if(!isValidIngredients) {
            result.validationError = "Some ingredients are invalid or do not exist in the database.";
            return res.status(400).send(result);
        }

        // Step 3: Proceed with recipe creation if all validations pass
        result.data = await createRecipe(req.body, req.file);
        if(result.data) {
            result.message = "Recipe Created Successfully";
        }  else {
            result.message = "Error in creating Recipe";
            statusCode = 500;
        }
        res.status(statusCode).send(result);
    }
    catch(ex) {
        console.log(ex);
        result.error = `Internal Server Error - ${ex.message ? ex.message : ex}`;
        res.status(500).send(result);
    }
})

router.get('/getAllRecipes',  auth, authorizeRoles(['SuperAdmin', 'Admin', 'Client']), async (req, res) => {
    let result = {};
    let statusCode = 200;
    try {
        // Step 1: Fetch recipes from the database asynchronously
        let allRecipies = await getAllRecipes();
        if(!allRecipies) {
            result.message = "No Recipes Found";
            return res.status(404).send(result);
        }

        // Step 2: Transform recipe instructions
        const transformedRecipes = allRecipies.map(recipe => {
            return {
                ...recipe.toJSON(),
                instructions: transformRecipeInstructions(recipe.instructions),
                image: recipe.imagePath ? `http://localhost:4000/${recipe.imagePath}` : null
            };
        });


        // Step 3: Group recipes by cuisine
        const groupedRecipes = transformedRecipes.reduce((acc, recipe) => {
            const cuisine = recipe.cuisine.name;
            if (!acc[cuisine]) {
                acc[cuisine] = [];
            }
            acc[cuisine].push(recipe);
            return acc;
        }, {});

        // Step 4: Return the grouped and transformed recipes
        result.data = groupedRecipes;
        result.message = "Recipes retrieved successfully";

        res.status(statusCode).send(result);
    } catch (ex) {
        console.log(ex);
        result.error = `Internal Server Error - ${ex.message ? ex.message : ex}`;
        res.status(500).send(result);
    }
});

router.get("/getRecipe/:id",  async(req, res) => {
    let result = {};
    let statusCode= 200;
    try {
        let recipe = await getParticularRecipe(req.params.id);
        if(!recipe) {
            result.message = "No Recipe Found";
            return res.status(404).send(result);
        }
        const transformedRecipe = {
            ...recipe.toJSON(),
            instructions: transformRecipeInstructions(recipe.instructions),
            image: recipe.imagePath ? `http://localhost:4000/${recipe.imagePath}` : null
        };

        result.data = transformedRecipe;
        result.message = "Recipe retrieved successfully";

        res.status(statusCode).send(result);  
    }
    catch(ex) {
        console.log(ex);
        result.error = `Internal Server Error - ${ex.message ? ex.message : ex}`;
        res.status(500).send(result);
    }
})

router.put("/updateRecipe/:id", auth, authorizeRoles(['SuperAdmin', 'Admin', 'Client']), upload.single('image'), async (req, res) => {
    let result = {};
    let statusCode = 201;
    try {
        // Validating incoming data 
        const { error } = recipeSchema.validate(req.body);
        if (error) {
            console.log(error);
            result.validationError = "Recipe Contents not valid";
            statusCode = 400;
            return res.status(statusCode).send(result);
        }

        // Find the if recipe exists or not
        let isExists = await checkIfRecipeExists(req.params.id);
        if (!isExists) {
            result.message = "Recipe not found";
            statusCode = 404;
            return res.status(statusCode).send(result);
        }
        
        let recipe = await updateRecipe(req.params.id, req.body, req.file);

        result.data = recipe;
        result.message = "Recipe Updated Successfully";
        res.status(statusCode).send(result);

    } catch (ex) {
        console.error(ex);
        result.error = `Internal Server Error - ${ex.message ? ex.message : ex}`;
        res.status(500).send(result);
    }
});

router.delete("/deleteRecipe/:id", auth, authorizeRoles(['SuperAdmin', 'Admin', 'Client']), async (req, res) => {
    let result = {};
    let statusCode = 200;
    try {

         // Find the if recipe exists or not
         let isExists = await checkIfRecipeExists(req.params.id);
         if (!isExists) {
             result.message = "Recipe not found";
             statusCode = 404;
             return res.status(statusCode).send(result);
         }

        await deleteRecipe(req.params.id);

        result.message = "Recipe Deleted Successfully";
        res.status(statusCode).send(result);

    } catch (ex) {
        console.error(ex);
        result.error = `Internal Server Error - ${ex.message ? ex.message : ex}`;
        res.status(500).send(result);
    }
});

router.get("/getIngredients",  async(req, res) => {
    let result = {};
    try {
        let ingredients = await getAllIngredients();
        result.data = ingredients.data;
        res.status(200).send(result);
    }
    catch(ex) {
        console.log(ex);
        result.error = `Internal Server Error - ${ex.message ? ex.message : ex}`;
        res.status(500).send(result);
    }
})

router.get("/getCuisines",  async(req, res) => {
    let result = {};
    try {
        let cuisines = await getAllCuisines();
        result.data = cuisines;
        res.status(200).send(result.data);
    }
    catch(ex) {
        console.log(ex);
        result.error = `Internal Server Error - ${ex.message ? ex.message : ex}`;
        res.status(500).send(result);
    }
})


module.exports = router;