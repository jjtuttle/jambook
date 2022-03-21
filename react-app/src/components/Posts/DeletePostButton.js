import React from 'react';
import { deletePost } from '../../store/posts';
import { useDispatch, useSelector } from 'react-redux';
import match from '../../utils/match';
import './Posts.css'



const DeletePostButton = ({ post }) => { // singular props arg...
    const dispatch = useDispatch();
    const sessionId = useSelector(state => state?.session?.user?.id);
    const writer_id = post.writer_id;

    const matchingToSessionUser = match(sessionId, writer_id);

    //! DELETE
    const handleDelete = async (postId) => {
        await dispatch(deletePost(postId));
    }


    return (
        matchingToSessionUser && (
            <div className="delete-posts-wrapper">
                <button className="btn btn-delete-post"
                    onClick={() => handleDelete(post?.id)} >
                    Delete
                </button>
            </div>
        )
    );
};

export default DeletePostButton;