const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');


const userAuth = (req, res, next) => {
    const token = req.cookies.auth_token;
    if (!token) {
        return res.sendStatus(403);
    }
    try {
        const data = jwt.verify(token, `${process.env.JWT_SECRET}`);
        //console.log(data);
        req.user = data;
        return next();
    } catch {
        return res.sendStatus(403);
    }
};


///// Get user's recipes 
const fetchUserRecipes = async (req, res) => {
    const { id } = req.params;
    try {
        const recipeList = await pool.query(
            "SELECT r.* FROM recipes r JOIN users u ON u.id = r.created_by WHERE u.id = $1", [id]
        );
        res.json(recipeList.rows);
    } catch (err) {
        console.error(err.message)
    }
};

// Get a recipe
const fetchRecipe = async (req, res) => {
    try {
        const { id } = req.params;
        const recipe = await pool.query("SELECT * FROM recipes WHERE id = $1", [id]);
        res.json(recipe.rows[0]);
    } catch (err) {
        console.error(err.message)
    }
}

/// Create recipe
const createRecipe = async (req, res) => {
    try {
        const { title, description, created_by } = req.body;
        const newRecipe = await pool.query(
            "INSERT INTO recipes (title, description, created_by) VALUES($1, $2, $3) RETURNING *",
            [title, description, created_by]
        );

        const recipeId = newRecipe.rows[0].id;

        await pool.query(
            "UPDATE users SET recipes = array_append(recipes, $1) WHERE id = $2",
            [recipeId, created_by]
        );
        res.json(newRecipe.rows[0]);
        console.log(`Added new recipe:`)
    } catch (error) {
        console.error(error)
    }
}

/// Update recipe
const updateUserRecipe = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        const recipeUpdate = await pool.query(
            "UPDATE recipes SET (title, description) = ($1, $2) WHERE id = $3 RETURNING *",
            [title, description, id]
        );
        res.json(recipeUpdate.rows);
        console.log(`Updated recipe new recipe:`)
    } catch (err) {
        console.error(err.message)
    }
}

//// Delete recipe
const deleteRecipe = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteRecipe = await pool.query(
            "DELETE FROM recipes WHERE recipe_id = $1",
            [id]
        );
        res.json("Recipe was deleted")
    } catch (error) {
        console.error(error.message)
    }
}



//// Get all recipes
const listRecipes = async (req, res) => {
    try {
        const allRecipe = await pool.query("SELECT * FROM recipes");
        res.json(allRecipe.rows);
    } catch (err) {
        console.error(err.message)
    }
}

// Random recipe
const fetchRandom = async (req, res) => {
    try {
        const recipe = await pool.query("SELECT * FROM recipes ORDER BY random() LIMIT 1 id");
        res.json(recipe.rows[0]);
    } catch (err) {
        console.error(err.message)
    }
}




module.exports = {
    userAuth,
    fetchUserRecipes,
    fetchRecipe,
    createRecipe,
    updateUserRecipe,
    deleteRecipe,
    listRecipes,
    fetchRandom
}