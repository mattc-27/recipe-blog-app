import React, { useState, useEffect, useContext } from 'react';
import { Outlet, Link, useParams } from 'react-router-dom';

import '../main.css';

export default function AppLayout() {

    return (
        <>
            <header>
                <div className="headerContent">
                    <div className="mainTitleHeader">
                        <h1>Recipe Blog</h1>
                    </div>
                    <nav className='navBar'>
                        <Link className='layoutLink' to={`/`}>Home</Link>
                        <Link className='layoutLink' to={`/login`}>Login</Link>
                        <button
                            className='btnStyle-1'
                            id='registerBtn'

                        ><a href='/register'>Register</a>
                        </button>
                    </nav>
                </div>
            </header>
            <Outlet />
        </>
    );
}