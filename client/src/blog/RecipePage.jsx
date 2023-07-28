import React, { Fragment, useEffect, useState, useContext } from 'react';
import { useLocation, useParams, useNavigate, useLoaderData } from 'react-router-dom';
import { getRecipe } from '../../userServices';

import '../main.css';

export default function RecipePage() {
    const navigate = useNavigate();
    const { recipe_id } = useParams();

    const [activeRecipe, setActiveRecipe] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`/api/recipes/${recipe_id}`)
            const data = await response.json()
            setActiveRecipe(data);
        }
        fetchData()
    }, [recipe_id])


    console.log(activeRecipe)

    function goBack() {
        navigate(-1);
    }

    return (
        <div className='appContainer'>
            <div className='dashboardPage'>
                <div className='dashboardTitle'>
                    <h1>{activeRecipe.title}</h1>
                </div>
                <div className='dashboardContent' >
                    <div className='dashboardCard'>
                        <p>{activeRecipe.description}</p>
                    </div>
                    <div className='dashboardCard'>
                        <button id="getStartedButton" onClick={goBack}>Return</button>
                    </div>
                </div>
            </div>
        </div>
    );
}



