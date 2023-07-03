import React, { useState, useEffect, useContext } from 'react';
import { Outlet, Link, useParams } from 'react-router-dom';
import { logoutUser } from '../../../userServices';
import { UserContext } from '../../../userContext';

import '../../main.css';

export default function Layout() {
    
    const { userProfile } = useContext(UserContext);
    const { userId } = useParams();

    /// Logout
    const logout = async () => {
        await logoutUser();
        window.location = `/`;
    };

    return (
        <>
            <header>
                <div className="appHeaderContent">
                    <div className="appHeader">
                        <h1>Recipe App</h1>
                    </div>
                    <nav className='navBar'>
                        <Link className='layoutLink' to={`/home/${userId}`}>Blog</Link>
                        <Link className='layoutLink' to={`/dashboard/${userId}`}>Dashboard</Link>

                        <button
                            id='logoutButton'
                            onClick={logout}
                        > Logout
                        </button>
                    </nav>
                </div>
            </header>
            <Outlet />
        </>
    );
}