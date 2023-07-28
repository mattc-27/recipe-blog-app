import React, { Fragment, useEffect, useState, useContext } from 'react';
import { useLocation, useParams, useNavigate, useLoaderData } from 'react-router-dom';



//import { getRecipe, updateRecipe } from '../../../recipeServices';
import { UserContext } from '../../../userContext';
import { getRecipe, getUser } from '../../../userServices';

import { MdDeleteOutline } from 'react-icons/md';

import '../../main.css';


const ModifyRecipe = () => {

    const { user_id } = useParams();
    const { recipe_id } = useParams();

    const navigate = useNavigate();

    const { userProfile, setUserProfile, activeRecipe, setActiveRecipe } = useContext(UserContext);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [recipeId, setRecipeId] = useState('');


    useEffect(() => {
        setTitle(activeRecipe.title);
        setDescription(activeRecipe.description);
        setRecipeId(activeRecipe.recipe_id)
    }, [activeRecipe])


    useEffect(() => {
        const fetchData = async () => {
            await getRecipe(recipe_id)
                .then((data) => setActiveRecipe(data));
        }
        fetchData()
    }, [])


    useEffect(() => {
        const userProfile = JSON.parse(localStorage.getItem('userDetails'))
        if (Object.keys(userProfile).length === 0) {
            console.log('Resetting user profile data')
            getUser(user_id)
                .then((data) => setUserProfile(data));
        }
        const activeRecipe = JSON.parse(localStorage.getItem('editRecipe'))
        if (Object.keys(activeRecipe).length === 0) {
            console.log('Resetting user profile data')
            getRecipe(recipe_id)
                .then((data) => setActiveRecipe(data));
        }

    }, [])

    console.log(activeRecipe, userProfile)


    // Update Recipe
    const recipeUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/recipes/${recipe_id}/update`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: title, description: description })
            })
            console.log(`Updated recipe`)
            window.location = `/dashboard/${user_id}`;
        } catch (error) {
            console.log(error.message);
        }
        
    };

    // Delete Recipe
    const handleDelete = async () => {
        const recipe_id = recipeId;
        try {
            const deleteRecipe = await fetch(`/api/recipes/${recipeId}/delete`, {
                method: "DELETE"
            })
            console.log(`Deleting recipe: ${title}`)
            window.location = `/dashboard/${user_id}`;
        } catch (err) {
            console.error(err.message)
        }
    }


    return (

        <div className='mainContainer-b' id='modifyRecipeContainer'>
            <div className='formContainer-b' id='editFormContainer' >
                <div className='pageTitle' id='editRecipeTitle'>
                    <h2>Modify Recipe</h2>
                    <button
                        id="deleteButton"
                        onClick={() => handleDelete(recipeId)}>
                        <MdDeleteOutline style={{ color: '#d52e25', height: '35px', width: '38px', background: 'none' }} />
                    </button>
                </div>
                <form className='formStyle-1' id='updateForm'>

                    <div className='formGroup-1'>
                        <label>Title</label>
                        <input
                            type="text"
                            value={title || ''}
                            onChange={e => setTitle(e.target.value)}
                        />
                    </div>
                    <div className='formGroup-1'>
                        <label>Description</label>
                        <input
                            type="text"
                            value={description || ''}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </div>
                    <div className='formGroup-1' id='formGroup-btn'>
                        <button
                            id="saveButton"
                            onClick={e => recipeUpdate(e)}>
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default ModifyRecipe;