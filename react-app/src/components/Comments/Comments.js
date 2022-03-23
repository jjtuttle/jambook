import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createComment, getComment, deleteComment, getAllComments } from '../../store/comments';
import { getPosts } from '../../store/posts';
import match from '../../utils/match';
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
    const matchUserToOwner = match(sessionUser, postId);

    const commentsObj = useSelector(state => state?.comments);
    const comments = Object.values(commentsObj)

    // const postsObj = useSelector(state => state?.posts);
    // const posts = Object.values(postsObj)



    return (
        <div className="post-comment-container">
            <ul className="post-comment">

                {comments?.filter(c => c.post_id === postId).map((c) => (
                    < li className={'comment'} key={c?.id}>

                        <div className="avatar">
                            <img src={avatar} alt='avatar' style={{ width: '20px' }} />
                            <span style={{ marginLeft: '10px', marginBottom: '25px' }}> {c?.owner}</span>
                        </div>

                        <div className="comment-body">
                            <li>
                                comment:  {c?.comment}
                            </li>
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