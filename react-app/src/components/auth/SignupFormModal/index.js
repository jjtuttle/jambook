import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupForm from '../auth/SignupForm';

function SignupFormModal() {
    const [ showModal, setShowModal ] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)}>Log In</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <SignupForm setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}

export default SignupFormModal;