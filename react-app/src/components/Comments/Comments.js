import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createComment, getComment, deleteComment, getAllComments } from '../../store/comments';
import { getPosts } from '../../store/posts';
// import match from '../../utils/match';
import './Comments.css';
// import { CommentOutlined } from '@material-ui/icons';



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
    // console.log('Posts from USESELCTOR,,,,,,,,,,,,,,,,,,,,,,,,,,,,,', posts);

    // const result = comments.filter((comment) => comment.post_id === posts.id)

    // console.log("RESULTS from FILTER**********************************", result);

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

