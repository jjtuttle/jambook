import { useHistory, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, getPosts, deletePost } from '../../store/posts';
import React from 'react';
import match from '../../utils/match';
import './Posts.css';
import EditPostsModal from '../EditPosts/EditPostsModal';
import EditCommentsModal from '../EditComments/EditCommentsModal';
import DeletePostButton from './DeletePostButton';
import Comments from '../Comments/Comments'
import avatar from '../../images/profile-icon.png';

import { Avatar, IconButton } from "@material-ui/core";
import AddComment from '../Comments/AddComment';
import Timestamp from 'react-timestamp';



const PostForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const postsObj = useSelector(state => state?.posts);
    const posts = Object.values(postsObj);

    const comment = useSelector((state) => state?.commentReducer);
    // console.log("Post Comp for commentID................", comment);

    const { postId } = useParams();

    const sessionUser = useSelector(state => state?.session?.user);

    const [ body, setBody ] = useState('');
    const [ errors, setErrors ] = useState([]);

    const matchUserToOwner = match(sessionUser, postId);

    // todo ————————————————————————————————————————————————————————————————————————
    //! NEED TO GAVE ERROR HANDLING FOR SUBMIT POST **
    // console.log('TEST BODY in post', body);

    // useEffect(() => {
    //     const errors = [];
    //     if (body === null) errors.push("Cannot submit an empty post.");
    //     // more error handling for Post Component

    //     setErrors(errors);
    // }, [ body ])
    // todo ————————————————————————————————————————————————————————————————————————

    useEffect(() => {
        dispatch(getPosts(postId))
    }, [ dispatch, postId ]);

    //!CREATE
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (body !== "") {
            const payload = {
                owner_id: sessionUser.id,
                body
            }
            dispatch(createPost(payload))
            setBody('');

        } else {
            alert("Please enter something.")
        }
    }

    //! DELETE
    const handleDelete = async (postId) => {
        await dispatch(deletePost(postId));
    }

   


    return (
        <>
            <div>

                {/* //! *************** Display Errors *****************/}
                < div className="errors" style={{ color: 'red' }}>
                    {errors?.length > 0 && errors?.map((error, id) => (
                        <div key={id}>{error}</div>
                    ))
                    }
                </div>
                <div className="form-container">
                    {/* //! *************** From Starts *****************/}
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="form--top">
                            <input className="post-input"
                                // id="" cols="30" rows="2"
                                placeholder="What's on your mind?"
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                                style={{
                                    borderRadius: '5px', border: 'none',
                                    outlineWidth: '0', width: '260px', height: '30px'
                                }}

                            />
                        </div>
                        <div className="form--bottom">
                            {/* <button className="btn btn-post" type="submit">
                                Post
                            </button> */}
                        </div>
                    </form>
                    {/* //! *************** From Ends & Start Post Displays  *****************/}
                </div>

                <div className="posts-container">

                    <ul>
                        {posts?.map((post) => (

                            <li className={"posted-posts"} key={post?.id}>

                                <div className="avatar">
                                    <img src={avatar} alt='avatar' style={{ width: '30px' }} />
                                    <span style={{ marginLeft: '10px', marginBottom: '25px', fontSize: 'x-small' }}>{post?.owner} </span>
                                    <span style={{ marginLeft: '150px', fontSize: 'x-small' }}><Timestamp relative date={post?.created_at} /></span>
                                </div>
                                <div className="post-body">
                                    {post?.body}
                                </div>

                                < div className="edit-delete-post-wrapper">
                                    <EditPostsModal post={post} postsId={post?.id} />
                                    <DeletePostButton post={post} />
                                    ECM<EditCommentsModal postId={post?.id} commentId={comment} />
                                </div>
                                <div className="comments-container">
                                    <Comments comment={comment} postId={post?.id} />

                                </div>
                            </li>
                        ))}

                    </ul>
                </div>
            </div >
        </>
    );
};

export default PostForm;

//!  get post timestamp and display nicely
// <p>{new Date(created_at?.toDate()).toUTCString()}</p>