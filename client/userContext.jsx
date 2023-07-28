import React, { useState, useEffect, createContext } from 'react';

const UserContext = createContext();


function UserProvider({ children }) {

    const [userProfile, setUserProfile] = useState({});

    const [activeRecipe, setActiveRecipe] = useState({});

    useEffect(() => {
        //const userData = JSON.parse(localStorage.getItem('userDetails'))
        console.log(userProfile);
        localStorage.setItem('userDetails', JSON.stringify(userProfile));

    }, [userProfile])

    useEffect(() => {
        //const userData = JSON.parse(localStorage.getItem('userDetails'))
        console.log(activeRecipe);
        localStorage.setItem('editRecipe', JSON.stringify(activeRecipe));

    }, [activeRecipe])


    // fetch current user
    async function getUserDetails(user) {
        const user_id = user;
        try {
            const response = await fetch(`/api/user/${user_id}`);
            const data = await response.json();
            setUserProfile(data);
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <UserContext.Provider value={{ setActiveRecipe, activeRecipe, setUserProfile, userProfile, getUserDetails }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserProvider, UserContext };