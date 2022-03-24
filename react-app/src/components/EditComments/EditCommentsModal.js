import { Modal } from '../../context/Modal';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import match from '../../utils/match';
import EditCommentsForm from './index';
import '../Comments/Comments.css';



function EditCommentsModal({ comment }) {

    const [ showModal, setShowModel ] = useState(false);

        console.log("Edit Comment Modal Comment id????????", comment);

    const sessionId = useSelector(state => state?.session?.user?.id);
    const writerId = comment?.writer_id;
    const matchingSessionToUser = match(sessionId, +writerId);

    console.log(showModal);

    return (
        <div>
{/* User has a comment tied to post, need to call edit  */}
            {matchingSessionToUser &&
                <div className="edit-comment-modal-btn-wrapper">
                    <button className="btn btn-edit-comment" onClick={(e) => setShowModel(true)}>Edit Comment</button>
                    {showModal && (
                        <Modal onClose={() => setShowModel(false)}>
                            <EditCommentsForm closeModal={() => setShowModel(false)} comment={comment} />
                        </Modal>
                    )}
                </div>
            }

{/* User has no comments, need to call add new comment */}
            <div className="edit-comment-modal-btn-wrapper">
                <button className="btn btn-edit-comment" onClick={(e) => setShowModel(true)}>Edit Comment</button>
                {showModal && (
                    <Modal onClose={() => setShowModel(false)}>
                        <EditCommentsForm closeModal={() => setShowModel(false)} comment={comment} />
                    </Modal>
                )}
            </div>
        </div>
    );
}

export default EditCommentsModal;