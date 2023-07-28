import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { UserContext } from '../../../userContext';
import { BsPencilSquare } from 'react-icons/bs';

import '../../main.css';

export default function RecipeList() {
    const { user_id } = useParams();
    const [recipes, setRecipes] = useState([]);

    const { userProfile, setUserProfile } = useContext(UserContext);

    useEffect(() => {
        const fetchData = async () => {
            //const id = userDetails.id;
            try {
                const userRecipes = await fetch(`/api/recipes/${user_id}/all`);
                const data = await userRecipes.json();
                setRecipes(data);
                console.log(data);
            } catch (error) {
                console.error(error.message);
            }
        };
        fetchData();
    }, []);

    const width = screen.width;

    return (

      
            <table id='userRecipeTable'>
                <tbody>
                    <tr className='tableHeader' >
                        <th id="tableId">id</th>
                        <th id="tableName">Name</th>
                        {/* <th id="tableDesc">Description</th> */}
                        <th id="tableCreated">Created</th>
                        <th id="tableModify">Modify</th>
                    </tr>
                    {recipes.map(recipe => (
                        <tr key={recipe.recipe_id} >
                            <td>
                                {recipe.recipe_id}
                            </td>
                            <td>
                                {recipe.title}
                            </td>
                          {/* 
                            <td className='p-3'>
                                {recipe.description}
                            </td>
                            */}
                            <td >
                                {recipe.created_at}
                            </td>
                            <td>
                                <Link to={`/recipes/${user_id}/${recipe.recipe_id}/edit`} state={{ recipe: recipe }}><BsPencilSquare size={28}  /></Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

    );
}