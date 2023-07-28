import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../../../userContext';
import { getUser, updateUser } from '../../../userServices';
import '../../main.css';

export default function Profile() {

    const { user_id } = useParams();

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
            getUser(user_id)
                .then((data) => setUserProfile(data));
        }
    }, [])


    /// Update user profile
    const updateProfile = async (e) => {
        e.preventDefault();
        //const user_id = user_id;
        try {
            const body = { username: username, location: location }
            await updateUser(body, user_id)
            window.location = `/dashboard/${user_id}`;
            //navigate(`/dashboard/${user_id}`);
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className='mainContainer-b' id='profileContainer'>
            <div className='formContainer-b' id='editFormContainer' >
                <div className='pageTitle' id='editProfileTitle'>
                    <h2>Update Profile</h2>
                </div>
                <form className='formStyle-1' id='updateForm'>

                    <div className='formGroup-1'>
                        <label>Username</label>
                        <input
                            type='text'
                            value={username || ''}
                            onChange={e => setUsername(e.target.value)}

                        />
                    </div>
                    <div className='formGroup-1'>
                        <label>Location</label>
                        <input
                            type="text"
                            value={location || ''}
                            onChange={e => setLocation(e.target.value)}

                        />
                    </div>
                    <div className='formGroup-1' id='formGroup-btn'>
                        <button
                            id="saveButton"
                            onClick={e => updateProfile(e)}>
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>

    );
}