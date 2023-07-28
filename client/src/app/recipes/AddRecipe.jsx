import React, { Fragment, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import { BsPencilSquare } from 'react-icons/bs';
import { UserContext } from '../../../userContext';

import '../../main.css';


const AddRecipe = () => {
    const { user_id } = useParams();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const onSubmitForm = async (e) => {
        e.preventDefault();
        const body = { title: title, description: description, created_by: user_id };
        try {
            const response = await fetch(`/api/recipes/new`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })
            console.log(`Added new recipe:`)
            window.location = `/recipes/${user_id}/all`;
        } catch (err) {
            console.error(err.message);
        }

    }



    return (
        <Fragment>
            <button
                id="addRecipeBtn"
                onClick={handleShow}>

                Add Recipe
            </button>
            <Modal
                show={show}
                onHide={handleClose}
                style={{ height: 'auto' }}
            >
                <Modal.Header closeButton className='bg-white'>
                    <h2 className='bg-white'>Create New Recipe</h2>
                </Modal.Header>
                <Modal.Body >
                    <div className="formContainer-b" id='addModalContainer'>
                        <form className='formStyle-1' id='addRecipeForm'>
                            <div className='formGroup-1'>
                                <label>Title</label>
                                <input
                                    type="text"

                                    value={title}
                                    onChange={e => setTitle(e.target.value)} />

                            </div>
                            <div className='formGroup-1'>
                                <label>Description</label>
                                <input
                                    type="text"
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}

                                />
                            </div>
                            <div className='formGroup-1' id='addRecipeButtons' >
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button className='btnStyle-a' id='recipeSaveButton' onClick={onSubmitForm}>
                                    Save Changes
                                </Button>
                            </div>
                        </form>
                    </div>


                </Modal.Body>
            </Modal>
        </Fragment>
    );
};

export default AddRecipe; 