import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../../../userContext';
import { getUser, updateUser } from '../../../userServices';
import '../../main.css';

export default function Profile() {

    const { userId } = useParams();

    const { userProfile, setUserProfile } = useContext(UserContext);

    const [username, setUsername] = useState('');
    const [location, setLocation] = useState('');


    useEffect(() => {
        setUsername(userProfile.username);
        setLocation(userProfile.location);
    }, [userProfile])


    useEffect(() => {
        const userProfile = JSON.parse(localStorage.getItem('userDetails'))
        if (Object.keys(userProfile).length === 0) {
            console.log('Resetting user profile data')
            getUser(userId)
                .then((data) => setUserProfile(data));
        }
    }, [])


    /// Update user profile
    const updateProfile = async (e) => {
        e.preventDefault();
        const id = userId;
        try {
            const body = { username: username, location: location }
            await updateUser(body, id)
            window.location = `/dashboard/${id}`;
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className='formContainer' >
            <form className='formStyle-1' id='proileForm'>
                <div className='formTitle'>
                    <h2>Update Profile</h2>
                </div>
                <div className='formGroup-2'>
                    <label>Username</label>
                    <input
                        type='text'
                        value={username || ''}
                        onChange={e => setUsername(e.target.value)}

                    />
                </div>
                <div className='formGroup-2'>
                    <label>Location</label>
                    <input
                        type="text"
                        value={location || ''}
                        onChange={e => setLocation(e.target.value)}

                    />
                </div>
                <div className='formGroup-2' id='formGroup-btn'>
                    <button
                        id="saveButton"
                        onClick={e => updateProfile(e)}>
                        Save
                    </button>
                </div>
            </form>
        </div>

    );
}