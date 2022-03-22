import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createComment, getComment, deleteComment } from '../../store/comments';
import match from '../../utils/match';
import './Comments.css';



// todo ————————————————————————————————————————————————————————————————————————
const Comments = ({ post }) => {
    const dispatch = useDispatch();

    const comments = [ '' ];
    const comment = useSelector((state) => state?.commentReducer);
    console.log("COMMENTSSSSS________------->>", comment);

    return (
        <div className="post-comment-container">
            <ul className="post-comment">
                {comments?.map(comment => (
                    < li className={'comment'} key={comment?.id}>
                        [comments]{comment?.comment}
                    </li>
                ))}
            </ul>
        </div >
    );
};

export default Comments;

//! git branch: render-comments-on-posts