import React, { Fragment, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import { BsPencilSquare } from 'react-icons/bs';
import { UserContext } from '../../../userContext';

import '../../main.css';


const AddRecipe = () => {
    const { userId } = useParams();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const onSubmitForm = async (e) => {
        e.preventDefault();
        const body = { title: title, description: description, created_by: userId };
        try {
            const response = await fetch(`/api/recipes/new`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })
            console.log(`Added new recipe:`)
            window.location = `/recipes/${userId}/all`;
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
            >
                <Modal.Header closeButton className='bg-white'>
                    <h2 className='bg-white'>Create New Recipe</h2>
                </Modal.Header>
                <Modal.Body >
                    <div className="addModalContainer">
                        <form id='addRecipeForm'>
                            <div className='formGroup-1' id='addFormGroup'>
                                <label>Title</label>
                                <input
                                    type="text"

                                    value={title}
                                    onChange={e => setTitle(e.target.value)} />

                            </div>
                            <div className='formGroup-1' id='addFormGroup'>
                                <label>Description</label>
                                <input
                                    type="text"
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}

                                />
                            </div>
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button className='btnStyle-1' id='recipeSaveButton' onClick={onSubmitForm}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    );
};

export default AddRecipe; 