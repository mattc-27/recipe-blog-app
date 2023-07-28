import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';


import RecipeTable from '../../blog/RecipeTable';
import '../../main.css';

export default function Blog() {

    const [recipes, setRecipes] = useState([]);
    const [randomRecipe, setRandomRecipe] = useState({});



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

    return (


        <div className='mainContainer-b'>
            <RecipeTable recipes={recipes} />
        </div>
    );
}