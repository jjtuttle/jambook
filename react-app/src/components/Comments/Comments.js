import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createComment, getComment, deleteComment } from '../../store/comments';
// import match from '../../utils/match';
import './Comments.css';
// import { CommentOutlined } from '@material-ui/icons';



// todo ————————————————————————————————————————————————————————————————————————
const Comments = ({ post }) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state?.session?.user);

    const commentsObj = useSelector(state => state?.comments);
    const comments = Object.values(commentsObj)



    // const filteredComments = comments.filter((comment) => )

// console.log('FILTERED CMTsssssssssss', comments);

useEffect(() => {
    dispatch(getComment(post))
}, [ dispatch, post ])

// const [comment, setComment ] = useState(post?.comments)

    console.log("POSTsssss in Comments Comp....", post);

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

//! git branch: render-comments-on-posts