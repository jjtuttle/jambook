import React from 'react';
import { deleteComment } from '../../store/comments';
import { useDispatch, useSelector } from 'react-redux';
import match from '../../utils/match';
import './Comments.css';



const DeleteCommentButton = ({ comment }) => { // singular props arg...
    const dispatch = useDispatch();
    const sessionId = useSelector(state => state?.session?.user?.id);
    const owner_id = comment.writer;

    const matchingToSessionUser = match(sessionId, owner_id);

    // console.log("DELETE COMMENT BUTTON USER & OWNER. .. . . . . . ..  ..", sessionId, comment );

    //! DELETE
    const handleDelete = async (commentId) => {
        await dispatch(deleteComment(commentId));
    }


    return (
        matchingToSessionUser && (
            <div className="delete-comment-wrapper">
                <button className="btn btn-delete-comment" style={{ marginLeft: '10px' }}
                    onClick={() => handleDelete(comment?.id)} >
                    Delete
                </button>
            </div>
        )
    );
};

export default DeleteCommentButton;