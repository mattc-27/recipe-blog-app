import React, { Fragment, useState, useEffect, useContext } from "react";
import { useParams } from 'react-router-dom';
import AddRecipe from "./AddRecipe";
import RecipeList from './RecipeList';

import { UserContext } from '../../../userContext';


import '../../main.css';


const UserRecipes = () => {
    const { id } = useParams();
    const { userDetails } = useContext(UserContext);
    const [userInfo, setUserInfo] = useState({});


    return (
        <Fragment>
            <div className='appContainer' id="recipePage" >
                <div className='appContent'>
                    <div id="recipePageTitle" className='appTitle'>
                        <div className='recipePageHeader'>
                            <h2>My recipes</h2>
                        </div>
                        <div id='addNewRecipe'>
                            <AddRecipe />
                        </div>
                    </div>
                </div>
                <div className='appContent' id='recipePageContent'>
                    <RecipeList />
                </div>
            </div>
        </Fragment>
    );
};

export default UserRecipes;