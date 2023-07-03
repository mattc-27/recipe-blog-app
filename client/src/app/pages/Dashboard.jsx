import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { UserContext } from '../../../userContext';
import { logoutUser, getUser } from '../../../userServices';

import '../../main.css';

export default function Dashboard() {

    const { userId } = useParams();
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
            getUser(userId)
                .then((data) => setUserProfile(data));
        }
    }, [])

    return (

        <div className='appContainer'>
            <div className='dashboardTitle'>
                <h1>Welcome, {userProfile.username}</h1>
            </div>
            <div className='appContent' id='dashboard' >
                <div className='dashboardCard'>
                    <h2>Profile</h2>
                    <Link to={`/profile/${userId}`}>Profile</Link>
                </div>
                <div className='dashboardCard'>
                    <h2>My Recipes</h2>
                    <Link to={`/recipes/${userId}/all`}>Recipes</Link>
                </div>
            </div>
        </div>
    );
}