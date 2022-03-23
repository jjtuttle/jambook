import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createComment, getComment, deleteComment } from '../../store/comments';
// import match from '../../utils/match';
import './Comments.css';
// import { CommentOutlined } from '@material-ui/icons';



// todo ————————————————————————————————————————————————————————————————————————
const Comments = ({ postId }) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state?.session?.user);

    const commentsObj = useSelector(state => state?.comments);
    const comments = Object.values(commentsObj)

   //! need a filter() for post_id === postID

    console.log('FILTERED CMTsssssssssss', comments);


useEffect(() => {
    dispatch(getComment(postId))
}, [ dispatch, postId ])

// const [comment, setComment ] = useState(post?.comments)



return (
    <div className="post-comment-container">
        <ul className="post-comment">
            {comments?.map((c) => (
                < li className={'comment'} key={c?.id}>
                    comment:  {c.id}

                </li>
            ))}
        </ul>
    </div >
);
};

export default Comments;

