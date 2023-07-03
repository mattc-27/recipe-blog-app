import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from 'react-router-dom';
import '../app.css';
import { BsPencilSquare } from 'react-icons/bs';
import '../../main.css';

const RecipeCard = ({ recipe }) => {

    const navigate = useNavigate();
    const goToRecipePage = (recipe) => {
        navigate(`/view-recipe/${recipe.id}`, { state: { recipe } });
    };
    {/*   
    const [id, setId] = useState();
    const navigate = useNavigate();
useEffect(() => {
    setId(recipe.id)
},[])
const goToRecipePage = (recipe) => {
    navigate(`/recipes/${id}`, { state: { recipe } });
};*/}



    return (

        <div className="recipeCard" key={recipe.id}>
      
            {/*<div className="cardHeader">
       
    
            </div>*/}
            <div className="cardText">
                <h3>{recipe.title}</h3>
                <p>{recipe.description}</p>
            </div>
            <div className="cardButtons">
      
                    <Link to={`/blog/recipe/${recipe.id}`} state={{ recipe: recipe }}>View</Link>
            
                {/*
            <button
                    className='cardViewButton'
                    type='button'

                >
                   <Link to={`/view-recipe/${id}`} state={{ recipe: recipe }}><BsPencilSquare size={28}  /></Link>
                </button>*/}
            </div>
        </div>
    );
};

export default RecipeCard;