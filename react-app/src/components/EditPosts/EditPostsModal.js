import { Modal } from '../../context/Modal';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import match from '../../utils/match';
import EditPostsForm from './index';
import '../Posts/Posts.css';



function EditPosts({ post }) {
    const [ showModal, setShowModel ] = useState(false);


    const sessionId = useSelector(state => state?.session?.user?.id);
    const writerId = post?.owner_id;
    const matchingSessionToUser = match(sessionId, +writerId);

    // console.log("EDIT Post Modal Vcomp,,,,,,,,,,,,,,,,,,,,", post);
// typeof(post.owner_id) - number

    return (
        matchingSessionToUser && (
            <div className="edit-posts-modal-btn-wrapper">
                <button className="btn btn-edit-post" onClick={(e) => setShowModel(true)}>Edit Post</button>
                {showModal && (
                    <Modal onClose={() => setShowModel(false)} >
                        <EditPostsForm closeModal={() => setShowModel(false)} posts={post} />
                    </Modal>
                )}
            </div>
        )
    );
}

export default EditPosts;