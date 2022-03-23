import { Modal } from '../../context/Modal';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import match from '../../utils/match';
import EditCommentsForm from './index';
import '../Comments/Comments.css';


function EditComments({ comment }) {
    const [ showModal, setShowModel ] = useState(false);


    const sessionId = useSelector(state => state?.session?.user?.id);
    const writerId = comment.writer_id;
    const matchingSessionToUser = match(sessionId, writerId);


    return (
        matchingSessionToUser && (
            <div className="edit-comment-modal-btn-wrapper">
                <button className="btn btn-edit-comment" onClick={(e) => setShowModel(true)}>Edit</button>
                {showModal && (
                    <Modal onClose={() => setShowModel(false)}>
                        <EditCommentsForm closeModal={() => setShowModel(false)} comment={comment} />
                    </Modal>
                )}
            </div>
        )
    );
}

export default EditComments;