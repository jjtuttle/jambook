import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createComment, getComment, deleteComment, getAllComments } from '../../store/comments';
import {getPosts } from '../../store/posts';
// import match from '../../utils/match';
import './Comments.css';
// import { CommentOutlined } from '@material-ui/icons';
import avatar from '../../images/profile-icon.png';
import EditCommentsModal from '../EditPosts/EditPostsModal';
import DeleteCommentButton from './DeleteCommentButton';

// todo ————————————————————————————————————————————————————————————————————————
const Comments = ({ postId }) => {
    const dispatch = useDispatch();
    

    useEffect(() => {
        dispatch(getPosts())
    }, [ dispatch ])

    useEffect(() => {
        dispatch(getAllComments())
    }, [ dispatch ])

    const sessionUser = useSelector(state => state?.session?.user);

    const commentsObj = useSelector(state => state?.comments);
    const comments = Object.values(commentsObj)
    // const comments = useSelector((state) => Object.values(state.comment));

    const postsObj = useSelector(state => state?.posts);
    const posts = Object.values(postsObj)

    console.log('Comments from USESELCTOR--------------------------', comments);
    // console.log('Posts from USESELCTOR,,,,,,,,,,,,,,,,,,,,,,,,,,,,,', postId);

    // const result = comments.filter((comment) => comment.post_id === posts.id)

    // console.log("RESULTS from FILTER**********************************", result);

    return (
        <div className="post-comment-container">
            <ul className="post-comment">

                {comments?.map((c) => (
                    < li className={'comment'} key={c?.id}>

                        <div className="avatar">
                            <img src={avatar} alt='avatar' style={{ width: '20px' }} />
                            {/* <span style={{ marginLeft: '10px', marginBottom: '25px' }}> {comment?.owner}</span> */}
                        </div>

                        <div className="comment-body">
                            comment:  {c.comment}
                        </div>

                        < div className="edit-delete-post-wrapper">
                            {/* <EditCommentsModal comment={c} commentId={c.id} />
                            <DeleteCommentButton comment={c} /> */}
                        </div>
                    </li>
                ))}
            </ul>
        </div >
    );
};

export default Comments;

//! latest branch for comment-per-post-issue::: <wed-fix-comment-per-post>