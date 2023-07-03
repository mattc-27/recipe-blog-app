import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

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
            })
            const data = await response.json();
            window.location = `/`;

        } catch (err) {
            console.error(err.message);
        }
    };
    return (

        <div className='formContainer'>
            <form className='formStyle-1' id='regForm'>
                <div className='formTitle'>
                    <h2>Register</h2>
                </div>
                <div className='formGroup-1'>
                    <input
                        type='text'
                        placeholder="Enter username"
                        name='username'
                        value={inputs.username}
                        onChange={handleChange}
                    />
                </div>
                <div className='formGroup-1'>

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
                        Submit
                    </button>
                    <a href='/'>Login</a>
                </div>
            </form>
        </div>
    );
}