const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

router.get(`/:user_id/all`, recipeController.userAuth, recipeController.fetchUserRecipes);
router.get(`/:recipe_id`, recipeController.fetchRecipe);

router.post(`/new`, recipeController.userAuth, recipeController.createRecipe);

router.put(`/:recipe_id/update`, recipeController.userAuth, recipeController.updateUserRecipe);

router.delete(`/:recipe_id/delete`, recipeController.userAuth, recipeController.deleteRecipe);

router.get(`/`, recipeController.listRecipes);

router.get(`/random`, recipeController.fetchRandom);


module.exports = router;