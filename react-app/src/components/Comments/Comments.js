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

    const comments = [''];

    // console.log("COMMENTSSSSS________------->>", commentsObj);

    return (
        <div className="post-comment-container">
            <ul className="post-comment">
                {comments?.map(comment => (
                    < li className={'comment'} key={comment?.id}>
                        {comment?.comment}
                    </li>
                ))}
            </ul>
        </div >
    );
};

export default Comments;

//! git branch: render-comments-on-posts