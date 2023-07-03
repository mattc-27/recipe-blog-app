import React, { Fragment, useEffect, useState, useContext } from 'react';
import { useLocation, useParams, useNavigate, useLoaderData } from 'react-router-dom';

//import { getRecipe, updateRecipe } from '../../../recipeServices';
import { UserContext } from '../../../userContext';
import { getRecipe, getUser } from '../../../userServices';


import '../../main.css';


const ModifyRecipe = () => {

    const { userId } = useParams();
    const { id } = useParams();

    const { userProfile, setUserProfile, activeRecipe, setActiveRecipe } = useContext(UserContext);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');


    useEffect(() => {
        setTitle(activeRecipe.title);
        setDescription(activeRecipe.description);
    }, [activeRecipe])


    useEffect(() => {
        const fetchData = async () => {
            await getRecipe(id)
                .then((data) => setActiveRecipe(data));
        }
        fetchData()
    }, [])


    useEffect(() => {
        const userProfile = JSON.parse(localStorage.getItem('userDetails'))
        if (Object.keys(userProfile).length === 0) {
            console.log('Resetting user profile data')
            getUser(userId)
                .then((data) => setUserProfile(data));
        }
        const activeRecipe = JSON.parse(localStorage.getItem('editRecipe'))
        if (Object.keys(activeRecipe).length === 0) {
            console.log('Resetting user profile data')
            getRecipe(id)
                .then((data) => setActiveRecipe(data));
        }

    }, [])

    console.log(activeRecipe, userProfile)


    // Update Recipe
    const recipeUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/recipes/${id}/update`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: title, description: description })
            })
            console.log(`Updated recipe`)
            window.location = `/dashboard/${userId}`;
        } catch (error) {
            console.log(error.message);
        }
    };

    return (

        <div className='formContainer' >
            <form className='formStyle-1' id='loginForm'>
                <div className='formTitle'>
                    <h2>Edit Recipe</h2>
                </div>
                <div className='formGroup-2'>
                    <label>Title</label>
                    <input
                        type="text"
                        value={title || ''}
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <div className='formGroup-2'>
                    <label>Description</label>
                    <input
                        type="text"
                        value={description || ''}
                        onChange={e => setDescription(e.target.value)}
                    />
                </div>
                <div className='formGroup-2' id='formGroup-btn'>
                    <button
                        id="saveButton"
                        onClick={e => recipeUpdate(e)}>
                        Save
                    </button>
                </div>
            </form>
        </div>
    )
};

export default ModifyRecipe;