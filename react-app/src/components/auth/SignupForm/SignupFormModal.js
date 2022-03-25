import React from 'react';
import { Modal } from '../../context/Modal';
import { useState } from 'react';
import SignUpForm from './SignUpForm';

const SignupFormModal = () => {
    const [ showModal, setShowModal ] = useState(false);

    return (
        <>
            <button className="dark-buttons" id='signup'
                onClick={() => setShowModal(true)}>Get Started</button>
            {
                showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <SignUpForm setShowModal={setShowModal} />
                    </Modal>
                )
            }
        </>
    );
};

export default SignupFormModal;