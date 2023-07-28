import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../../main.css';

export default function Register() {





    const [inputs, setInputs] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    };

    useEffect(() => {
        console.log(inputs);
    }, [setInputs])

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/user/register`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username: inputs.username, password: inputs.password }),
                    credentials: 'include'
                });
                const data = await response.json();
                if (response.ok) {
                    toast.success('Registration successful!');
                    setTimeout(() => {
                        window.location = `/login`; // Redirect to homepage or desired page after a delay
                    }, 2000); 
                   
                } else {
                    toast.error('Registration failed. Please try again.')
                }
            } catch (error) {
                console.error(error.message);
                toast.error('An error occurred. Please try again.')
            }
    };

    return (
        <div className='mainContainer-a'>
            <div className='formContainer-a'>
                <form className='formStyle-a' id='regForm'>
                    <div className='formTitle-a'>
                        <h2>Create an account</h2>
                    </div>
                    <div className='formGroup-a'>
                        <input
                            type='text'
                            placeholder="Enter username"
                            name='username'
                            value={inputs.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='formGroup-a'>
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
                            Submit
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
                        <a href='/'>Login</a>
                    </div>
                </form>
            </div>
        </div>
    );
}