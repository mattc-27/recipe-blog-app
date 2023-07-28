import React, { useState, useEffect, useContext } from 'react';
import { Outlet, Link, useParams } from 'react-router-dom';
import { logoutUser } from '../../../userServices';
import { UserContext } from '../../../userContext';

import '../../main.css';

export default function Layout() {
    
    const { userProfile } = useContext(UserContext);
    const { user_id } = useParams();

    /// Logout
    const logout = async () => {
        await logoutUser();
        window.location = `/`;
    };

    return (
        <>
            <header>
                <div className="appHeaderContent">
                    <div className="appTitleHeader">
                        <h1>Recipe App</h1>
                    </div>
                    <nav className='navBar'>
                        <Link className='layoutLink' to={`/home/${user_id}`}>Blog</Link>
                        <Link className='layoutLink' to={`/dashboard/${user_id}`}>Dashboard</Link>

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