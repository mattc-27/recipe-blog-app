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
        const { id } = req.params;
        const recipe = await pool.query("SELECT * FROM recipes WHERE id = $1", [id]);
        res.json(recipe.rows[0]);
    } catch (err) {
        console.error(err.message)
    }
}

module.exports = {
    listRecipes,
    fetchBlogPost
}