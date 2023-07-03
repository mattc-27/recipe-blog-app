import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

import { listRecipes } from '../../recipeServices';

import '../main.css';

export default function Home() {

    const [recipes, setRecipes] = useState([]);
    const [randomRecipe, setRandomRecipe] = useState({});




    function getRandomItem(arr) {

        // get random index value
        const randomIndex = Math.floor(Math.random() * arr.length);

        // get random item
        const item = arr[randomIndex];

        return item;
    }

    const getRecipes = async () => {
        try {
            const response = await fetch(`/api/blog`)
            const data = await response.json();
            setRecipes(data);

            console.log(data);
        } catch (error) {
            console.error(error.message)
        }

    }

    useEffect(() => {
        getRecipes()



    }, []);

    useEffect(() => {
        const result = getRandomItem(recipes);
        setRandomRecipe(result)
        console.log(result);


    }, [recipes]);





    return (


        <div className='homeContainer'>

            <div className='listSection' >
                {recipes.map(recipe => (

                    <div className='recipeContainer'>
                        <div className="recipeCard" key={recipe.recipe_id}>
                            <div className='cardContent'>
                                {/* <RecipeCard recipe={recipe} />*/}
                                <div className="cardText">
                                    <h3>{recipe.title}</h3>
                                    <p>{recipe.description}</p>
                                </div>
                                <div className="cardButtons">

                                    <Link to={`/blog/recipe/${recipe.id}`} state={{ recipe: recipe }}>View</Link>

                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>




    );
}