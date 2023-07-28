const pool = require('../db');

//// Get all recipes
const listRecipes = async (req, res) => {
    try {
        const allRecipe = await pool.query("SELECT * FROM recipes");
        res.json(allRecipe.rows);
    } catch (err) {
        console.error(err.message)
    }
}

// Get a recipe - blog
const fetchBlogPost = async (req, res) => {
    try {
        const { recipe_id } = req.params;
        const recipe = await pool.query("SELECT * FROM recipes WHERE recipe_id = $1", [recipe_id]);
        res.json(recipe.rows[0]);
    } catch (err) {
        console.error(err.message)
    }
}

module.exports = {
    listRecipes,
    fetchBlogPost
}