import React, { useState, useEffect, useContext } from 'react';
import { Outlet, Link, useParams } from 'react-router-dom';

import '../main.css';

export default function HomeLayout() {

    const [visible, setVisible] = useState(false);
    useEffect(() => {
        function handleResize() {
            if (window.innerWidth > 700) {
                setVisible(false);
            } else if (window.innerWidth < 700) {
                setVisible(true);
            }
        }
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [])
    return (
        <>
            <header class='homeNav'>
                <div className="homeNavBarTop">
                <Link className='navLoginLink' to={`/login`}>Login</Link>
                </div>
                <nav className='homeNavBarBottom'>
                <Link className='navBarTitle' to={`/`}><h1>Recipe Blog</h1></Link>

                    <Link className='registerLink' to={`/register`}>Register</Link>
                </nav>
            </header>
            <Outlet />
        </>
    );
}