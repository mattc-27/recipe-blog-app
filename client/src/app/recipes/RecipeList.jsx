import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { UserContext } from '../../../userContext';
import { BsPencilSquare } from 'react-icons/bs';

import '../../main.css';

export default function RecipeList() {
    const { userId } = useParams();
    const [recipes, setRecipes] = useState([]);

    const { userProfile, setUserProfile } = useContext(UserContext);

    useEffect(() => {
        const fetchData = async () => {
            //const id = userDetails.id;
            try {
                const userRecipes = await fetch(`/api/recipes/${userId}/all`);
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

        <div  className='appContent' id='recipeList'>
            <table id='userRecipeTable'>
                <tbody>
                    <tr className='tableHeader'>
                        <th>id</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th id='createdAtH'>Created</th>
                        <th>Modify</th>
                    </tr>
                    {recipes.map(recipe => (
                        <tr key={recipe.id} className='mt-5'>
                            <td className='p-3'>
                                {recipe.id}
                            </td>
                            <td className='p-3'>
                                {recipe.title}
                            </td>
                            <td className='p-3'>
                                {recipe.description}
                            </td>
                            <td  className='p-3'>
                                {recipe.created_at}
                            </td>
                            <td className='p-3'>
                                <Link to={`/recipes/${userId}/${recipe.id}/edit`} state={{ recipe: recipe }}><BsPencilSquare size={28}  /></Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}