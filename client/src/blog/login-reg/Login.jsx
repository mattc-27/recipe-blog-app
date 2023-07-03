import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../../../userContext';
import { getUser } from '../../../userServices';

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
            if (data.isValid) {
                await getUser(data.id)
                setUserProfile(data.id);
                navigate(`/dashboard/${data.id}`);
            }
        } catch (err) {
            console.error(err.message);
        }
    };


    return (

        <div className='formContainer' >
            <form className='formStyle-1' id='loginForm'>
                <div className='formTitle'>
                    <h2>Login</h2>
                </div>
                <div className='formGroup-1'>
                    {/*  <label>Username</label>*/}
                    <input
                        type='text'
                        placeholder="Enter username"
                        name='username'
                        value={inputs.username}
                        onChange={handleChange}
                    />
                </div>
                <div className='formGroup-1'>
                    {/* <label>Password</label>*/}
                    <input
                        type='password'
                        placeholder="Password"
                        name='password'
                        value={inputs.password}
                        onChange={handleChange}
                    />
                </div>
                <div className='formGroup-1'>
                    <button
                        className='btnStyle-1'
                        id="loginButton"
                        onClick={onSubmitForm}
                    >
                        Login
                    </button>
                    <a href='/register'>Create an account</a>
                </div>
            </form>
        </div>

    );
}

