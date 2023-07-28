import React, { useState, useEffect, useContext } from 'react';
import { Outlet, Link, useParams } from 'react-router-dom';
import { logoutUser } from '../../../userServices';
import { UserContext } from '../../../userContext';
import { TfiWrite } from 'react-icons/tfi'
import { RiHome2Line, RiAccountBoxLine, RiTodoLine, RiAlignJustify } from 'react-icons/ri'

//import TopNav from './TopNav';

import '../../main.css';

export default function AppLayout() {

    const { userProfile } = useContext(UserContext);
    const { user_id } = useParams();

    const [visible, setVisible] = useState(false);
    const [show, setShow] = useState(false);

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

    /// Logout
    const logout = async () => {
        await logoutUser();
        window.location = `/`;
    };


    const handleNav = () => {
        if (!show) {
            setShow(true);
        } else setShow(false);
    }






    return (
        <>

            {visible ?
                <div className='mobileNav'>
                    <div className="mobileNavTitle">
                        <h1>RecipeApp</h1>
                    </div>
                    <div className='mobileNavContent'>
                        <button id='showNav' onClick={handleNav}><RiAlignJustify size={35} /></button>
                        {show ?
                            //<TopNav />
                            <nav className='mobileNavBar'>

                                <div className='mobileNavLinks'>

                                    <Link className='mobileLink' to={`/dashboard/${user_id}`} onClick={handleNav} >Dashboard</Link>
                                </div>
                                <div className='mobileNavLinks'>

                                    <Link className='mobileLink' to={`/profile/${user_id}`} onClick={handleNav}>Account</Link>
                                </div>
                                <div className='mobileNavLinks'>

                                    <Link className='mobileLink' to={`/recipes/${user_id}/all`} onClick={handleNav}>Your Recipes</Link>
                                </div>
                                <div className='mobileNavLinks'>

                                    <Link className='mobileLink' to={`/blog/${user_id}`} onClick={handleNav}>Blog</Link>
                                </div>



                            </nav>
                            : null}



                        <button
                            id='mobileLogoutBtn'
                            onClick={logout}
                        > Logout
                        </button>
                    </div>

                </div>

                :
                <div className='mainNav'>
                    <div className="mainNavTitle">
                        <h1>RecipeApp</h1>

                    </div>
                    <nav className='mainNavBar'>

                        <div className='mainNavLinks'>
                            <RiHome2Line size={25} color={'#e3e4ef'} />
                            <Link className='mainNavLink' to={`/dashboard/${user_id}`}>Dashboard</Link>
                        </div>
                        <div className='mainNavLinks'>
                            <RiAccountBoxLine size={25} color={'#e3e4ef'} />
                            <Link className='mainNavLink' to={`/profile/${user_id}`}>Account</Link>
                        </div>
                        <div className='mainNavLinks'>
                            <TfiWrite size={25} color={'#e3e4ef'} />
                            <Link className='mainNavLink' to={`/recipes/${user_id}/all`}>Your Recipes</Link>
                        </div>
                        <div className='mainNavLinks'>
                            <RiTodoLine size={25} color={'#e3e4ef'} />
                            <Link className='mainNavLink' to={`/blog/${user_id}`}>Blog</Link>
                        </div>



                    </nav>

                    <button
                        id='mainLogoutBtn'
                        onClick={logout}
                    > Logout
                    </button>
                </div>



            }



            <Outlet />
        </>





    );
}

/* 
 <div className='topbar'>
                    <div className="topHeaderContent">
                        <div className="topTitleHeader">
                            <h1>RecipeApp</h1>

                        </div>
                        <nav className='topNavBar'>

                            <div className='topLayoutNav'>
                                <RiHome2Line size={25} />
                                <Link className='topLayoutLinkA' to={`/dashboard/${user_id}`}>Dashboard</Link>
                            </div>
                            <div className='topLayoutNav'>
                                <RiAccountBoxLine size={25} />
                                <Link className='topLayoutLinkA' to={`/profile/${user_id}`}>Account</Link>
                            </div>
                            <div className='topLayoutNav'>
                                <TfiWrite size={25} />
                                <Link className='topLayoutLinkA' to={`/recipes/${user_id}/all`}>Your Recipes</Link>
                            </div>
                            <div className='topLayoutNav'>
                                <RiTodoLine size={25} />
                                <Link className='topLayoutLinkA' to={`/home/${user_id}`}>Blog</Link>
                            </div>



                        </nav>
                        <button
                            id='topLogoutButtonA'
                            onClick={logout}
                        > Logout
                        </button>
                    </div>

                </div>*/
