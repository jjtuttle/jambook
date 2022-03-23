import { Modal } from '../../context/Modal';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import match from '../../utils/match';
import EditPostsForm from './index';
import '../Posts/Posts.css';
import { useParams } from "react-router-dom";


function EditPosts({ post }) {
    const [ showModal, setShowModel ] = useState(false);

    // const userId = useParams();

    const sessionId = useSelector(state => state?.session?.user?.id);
    const writerId = post.owner_id;
    const matchingSessionToUser = match(sessionId, +writerId);

// console.log("EDIT Post Modal Vcomp,,,,,,,,,,,,,,,,,,,,", post.owner_id);


    return (
        matchingSessionToUser && (
            <div className="edit-posts-modal-btn-wrapper">
                <button className="btn btn-edit-post" onClick={(e) => setShowModel(true)}>Edit</button>
                {showModal && (
                    <Modal onClose={() => setShowModel(false)}>
                        <EditPostsForm closeModal={() => setShowModel(false)} posts={post} />
                    </Modal>
                )}
            </div>
        )
    );
}

export default EditPosts;