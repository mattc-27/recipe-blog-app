const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

router.get(`/`, blogController.listRecipes);


router.get(`/recipe/:recipe_id`, blogController.fetchBlogPost);



module.exports = router;