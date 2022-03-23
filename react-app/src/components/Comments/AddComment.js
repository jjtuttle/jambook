import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {createComment, updateComment, deleteComment} from '../../store/comments';
import match from '../../utils/match';

import './Comments.css';
// Avatar?
// Icons


const AddComment = ({ postId }) => {
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state?.session?.user);


    const [ comment, setComment ] = useState('');
    const [ errors, setErrors ] = useState([]);

    const matchUserToOwner = match(sessionUser, postId);

    //!CREATE
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (comment !== "") {
            const payload = {
                owner_id: sessionUser.id,
                comment
            }
            dispatch(createComment(payload))
            setComment('');

        } else {
            alert("Please enter something.")
        }
    }


    return (
        <div>
            <span style={{marginLeft:'100px', fontSize:'small'}}
            ><button className="add-comment-btn-modal" > Add Comment</button>
            
            </span>
        </div>
    );
};

export default AddComment;