import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { UserContext } from '../../../userContext';
import { logoutUser, getUser } from '../../../userServices';

import '../../main.css';

export default function Dashboard() {
    const navigate = useNavigate();
    const { user_id } = useParams();
    const { userProfile, getUserDetails, setUserProfile } = useContext(UserContext);

    /// /// Initial login 

    // User profile set from user context

    // Checks if userProfile is still in local storage. 
    // If userProfile doesn't persist after refresh, fetch the data gain 

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('userDetails'))
        console.log(currentUser);
        if (Object.keys(currentUser).length === 0) {
            console.log('Resetting user profile data')
            getUser(user_id)
                .then((data) => setUserProfile(data));
        }
    }, [])

    return (
        <div className='mainContainer-b' id='dashboard'>

            <div className='dashboardPage'>
                <div className='dashboardTitle'>
                    <h1>Let's get baked, {userProfile.username}</h1>
                </div>
                <div className='dashboardContent' >
                    <div className='dashboardCard'>
                        <p>To get started, click the button below. Or select Your Recipes from the navigation to view your posts and/or add a new recipe.</p>
                        <p>Select the Account option to update your profile.</p>
                        
                    </div>
                    <div className='dashboardCard'>
                    <button id="getStartedButton" onClick={() => navigate(`/recipes/${user_id}/all`)}>Get Started</button>
                    </div>
                    {/*
               
                    <h2>Profile</h2>
                <div className='dashboardCard'>
                    <h2>Add, Modify Recipes</h2>
                                        <Link className='uiLink' to={`/profile/${user_id}`}>Profile</Link>
                    <Link className='uiLink' to={`/recipes/${user_id}/all`}>Recipes</Link>
    </div>*/}
                </div>
            </div>

        </div>
    );
}