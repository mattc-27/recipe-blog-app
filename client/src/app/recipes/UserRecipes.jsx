import React, { Fragment, useState, useEffect, useContext } from "react";
import { useParams } from 'react-router-dom';
import AddRecipe from "./AddRecipe";
import RecipeList from './RecipeList';

import { UserContext } from '../../../userContext';


import '../../main.css';


const UserRecipes = () => {
    const { user_id } = useParams();
    const { userDetails } = useContext(UserContext);
    const [userInfo, setUserInfo] = useState({});


    return (
        <div className='mainContainer-b' id='userRecipes'>
            <div className='userRecipesPage' >
             
                <div className='userRecipesTitle'>
                    <h2>My recipes</h2>
                    <AddRecipe />
                </div>
               
              
                <div className='userRecipesContent'>
                    <RecipeList />
                </div>
            </div>
        </div>
    );
}

export default UserRecipes;