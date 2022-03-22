import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createComment, getComment, deleteComment } from '../../store/comments';
import match from '../../utils/match';
import './Comments.css';



// todo ————————————————————————————————————————————————————————————————————————
const Comments = (posts) => {
    const dispatch = useDispatch();
    const commentsObj = useSelector((state) => state?.commentReducer);
    const comments = [ '' ];

    const p = Object.values(posts)

    useEffect(() => {
        dispatch(getComment(posts))
    }, [ dispatch, posts ])

    const [ comment, setComment ] = useState('')

    console.log("POSTsssss in Comments Comp....", p);
    // console.log("COMMENTSSSSS________------->>", posts);

    return (
        <div className="post-comment-container">
            <ul className="post-comment">
                {comments?.map(comment => (
                    < li className={'comment'} key={comment?.id}>
                        [comment]  {comment?.comment}
                    </li>
                ))}
            </ul>
        </div >
    );
};

export default Comments;

//! git branch: render-comments-on-posts