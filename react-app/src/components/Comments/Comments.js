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
import Timestamp from 'react-timestamp';


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

    // console.log("POst ID in Post Comp..........", postId);

    return (
        <div className="post-comment-container">
            <ul className="post-comment">

                {comments?.filter(c => c?.post_id === postId).map((c) => (
                    < li className={'comment'} key={c?.id}>

                        <div className="avatar">
                            <img src={avatar} alt='avatar' style={{ width: '20px' }} />
                            <span style={{ marginLeft: '10px', marginBottom: '25px', fontSize: 'x-small' }}> {c?.owner}</span>
                            <span style={{ marginLeft: '150px', fontSize: 'x-small' }}><Timestamp relative date={c?.created_at} /></span>
                        </div>

                        <div className="comment-body">
                            <li>
                                {c?.comment}
                            </li>
                        </div>

                        < div className="edit-delete-post-wrapper">
                            <EditCommentsModal comment={c} commentId={c?.id} />
                            <DeleteCommentButton comment={c} />
                        </div>
                    </li>
                ))}
            </ul>
        </div >
    );
};

export default Comments;

