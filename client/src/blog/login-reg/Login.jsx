import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../../../userContext';
import { getUser } from '../../../userServices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../../main.css';

export default function Login() {

    const navigate = useNavigate();

    const { setUserProfile } = useContext(UserContext);

    const [inputs, setInputs] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    };

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/login`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: inputs.username, password: inputs.password })
                })
            const data = await response.json();
            console.log(data);
            if (data.isValid && response.ok) {
                toast.success('Login successful!');
                await getUser(data.user_id)
                setUserProfile(data.user_id);
                setTimeout(() => {
                    navigate(`/dashboard/${data.user_id}`); // Redirect to homepage or desired page after a delay
                }, 2000);
            } else {
                toast.error('Login failed. Please try again.')
            }
        } catch (error) {
            console.error(error.message);
            toast.error('An error occurred. Please try again.')
        }
    };


    return (
        <div className='mainContainer-a'>
            <div className='formContainer-a' >
                <form className='formStyle-a' id='loginForm'>
                    <div className='formTitle-a'>
                        <h2>Sign In</h2>
                    </div>
                    <div className='formGroup-a'>
                        {/*  <label>Username</label>*/}
                        <input
                            type='text'
                            placeholder="Enter username"
                            name='username'
                            value={inputs.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='formGroup-a'>
                        {/* <label>Password</label>*/}
                        <input
                            type='password'
                            placeholder="Password"
                            name='password'
                            value={inputs.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='formGroup-a'>
                        <button
                            className='btnStyle-a'
                            id="loginButton"
                            onClick={onSubmitForm}
                        >
                            Login
                        </button>
                        <ToastContainer
                            position="top-right"
                            autoClose={5000}
                            hideProgressBar
                            newestOnTop={false}
                            closeOnClick={false}
                            rtl={false}
                            pauseOnFocusLoss={false}
                            draggable={false}
                            pauseOnHover
                            theme="light"
                        />
                        <a href='/register'>Create an account</a>
                    </div>
                </form>
            </div>
        </div>
    );
}

