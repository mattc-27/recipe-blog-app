import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';

import '../main.css';

export default function RecipeTable({ recipes }) {

    //const [recipes, setRecipes] = useState([]);



    return (

      
            <table id='homeRecipeTable'>
                <tbody>
                    <tr className='tableHeader' >
                        <th id="tableId">id</th>
                        <th id="tableName">Name</th>
                        <th id="tableDesc">Description</th>
                        <th id="tableCreated">Created</th>
                        <th id="tableView">View</th>
                    </tr>
                    {recipes.map(recipe => (
                        <tr key={recipe.recipe_id} >
                            <td>
                                {recipe.recipe_id}
                            </td>
                            <td>
                                {recipe.title}
                            </td>
                          
                            <td className='p-3'>
                                {recipe.description}
                            </td>
                            
                            <td >
                                {recipe.created_at}
                            </td>
                            <td>
                                <Link to={`/recipes/${recipe.recipe_id}`} state={{ recipe: recipe }}>View</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

    );
}