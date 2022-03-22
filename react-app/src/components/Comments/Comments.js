import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createComment, getComment, deleteComment } from '../../store/comments';
import match from '../../utils/match';
import './Comments.css';
import { CommentOutlined } from '@material-ui/icons';



// todo ————————————————————————————————————————————————————————————————————————
const Comments = ({post}) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state?.session?.user);

    // const commentsObj = useSelector(state => state?.commentReducer);
    // const comments = Object.values(commentsObj)
    // const comments = [''];


    useEffect(() => {
        dispatch(getComment(post.id))
      
        // if(comment) {
        //     console.log("GETTER for Comments......----->>>", comment);
        // }
    }, [ dispatch, post.id ])

    const [ comments, setComments ] = useState([1,2,3])  // current comments for DB
    const [comment, setComment] = useState('');         // create a new comment
    
    console.log("POSTsssss in Comments Comp....", post);

    return (
        <div className="post-comment-container">
            <ul className="post-comment">
                {comments?.map((c, i) => (
                    < li className={'comment'} key={c?.i}>
                        comment  {c}
                    </li>
                ))}
            </ul>
        </div >
    );
};

export default Comments;

//! git branch: render-comments-on-posts