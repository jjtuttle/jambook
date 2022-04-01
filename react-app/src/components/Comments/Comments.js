import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllComments } from '../../store/comments';
import { getPosts } from '../../store/posts';
// import match from '../../utils/match';
import './Comments.css';
import EditCommentsModal from '../EditComments/EditCommentsModal';
import DeleteCommentButton from './DeleteCommentButton';
import Timestamp from 'react-timestamp';
import Avatar from '@mui/material/Avatar';
import { stringAvatar } from '../../utils/avatarColorPicker';



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
    // const matchUserToOwner = match(sessionUser, postId);

    const commentsObj = useSelector(state => state?.comments);
    const comments = Object.values(commentsObj)

    // console.log("Comments data in comments comp. ###############################>>", comments);

    comments.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    // const x = comments.map((c) =>  c.last)
    // console.log("SESSION USER Comp for POSTS................", x);



    return (
        <div className="post-comment-container">
            <ul className="ul_comment">

                {comments?.filter(c => c?.post_id === postId).map((c) => (

                    < li className={'comment'} key={c?.id}>

                        <div className="comment_top">
                            <div className="comment__top-img">
                                <Avatar className="comment__avatar" {...stringAvatar(c?.first.concat(' ', c?.last))}
                                    style={{ height: '25px', width: '25px', fontSize: '13px' }}
                                />
                                {/* <img src={avatar} alt='avatar' /> */}
                            </div>
                        </div>

                        <div className="comments__top-info">
                            <div className="comment__top-user">
                                <span> {c?.owner}</span>
                            </div>

                            <div className="comment__top-time">
                                <span style={{ marginLeft: '5px' }}>Posted: <Timestamp relative date={c?.created_at} /></span>
                            </div>
                        </div>

                        <div className="comment-body">
                            {c?.comment}
                        </div>

                        < div className="edit-delete-post-wrapper">
                            <EditCommentsModal comment={c}  />
                            <DeleteCommentButton comment={c} />

                        </div>
                    </li>
                ))}
            </ul>
        </div >
    );
};

export default Comments;

