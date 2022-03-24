import { Modal } from '../../context/Modal';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import match from '../../utils/match';
import AddCommentsForm from './index';
import './AddComments.css';



function AddCommentsModal({ comment, post_id }) {

    const [ showModal, setShowModel ] = useState(false);


    const sessionId = useSelector(state => state?.session?.user?.id);
    const writerId = comment?.writer_id;
    const matchingSessionToUser = match(sessionId, +writerId);

    // console.log("Add Comments Modal post_id -______-________----______--", post_id);

    return (
        <div>
{/* User has a comment tied to post, need to call edit  */}
            {matchingSessionToUser &&
                <div className="edit-comment-modal-btn-wrapper">
                    <button className="btn btn-edit-comment" onClick={(e) => setShowModel(true)}>Add Comment</button>
                    {showModal && (
                        <Modal onClose={() => setShowModel(false)}>
                            <AddCommentsForm closeModal={() => setShowModel(false)} comment={comment} post_id={post_id} />
                        </Modal>
                    )}
                </div>
            }

{/* User has no comments, need to call add new comment */}
            <div className="edit-comment-modal-btn-wrapper">
                <button className="btn btn-edit-comment" onClick={(e) => setShowModel(true)}>Add Comment</button>
                {showModal && (
                    <Modal onClose={() => setShowModel(false)}>
                        <AddCommentsForm closeModal={() => setShowModel(false)} comment={comment} post_id={post_id}/>
                    </Modal>
                )}
            </div>
        </div>
    );
}

export default AddCommentsModal;