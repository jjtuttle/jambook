import { useHistory, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, getPosts, deletePost } from '../../store/posts';
import React from 'react';
import match from '../../utils/match';
import './Posts.css';
import EditPostsModal from '../EditPosts/EditPostsModal';
import AddCommentsModal from '../AddComments/AddCommentsModal';
import DeletePostButton from './DeletePostButton';
import Comments from '../Comments/Comments'
import avatar from '../../images/profile-icon.png';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Avatar from '@mui/material/Avatar';

import AddComment from '../AddComments/AddComment';
import Timestamp from 'react-timestamp';



const PostForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const postsObj = useSelector(state => state?.posts);
    const posts = Object.values(postsObj);

    posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    const comment = useSelector((state) => state?.commentReducer);
    

    const { postId } = useParams();

    const sessionUser = useSelector(state => state?.session?.user);

    const [ body, setBody ] = useState('');
    const [ errors, setErrors ] = useState([]);

    const matchUserToOwner = match(sessionUser, postId);

    // console.log("SESSION USER Comp for POSTS................", sessionUser.username);

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
    // Avatar color ---------------------------
    function stringToColor(string) {
        let hash = 0;
        let i;

        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */

        return color;
    }

    function stringAvatar(name) {
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: `${name.split(' ')[ 0 ][ 0 ]}${name.split(' ')[ 1 ][ 0 ]}`,
        };
    }

    // -------

    return (
        <>
            <div className="post_container">
                {/* //! *************** Display Errors *****************/}
                < div className="errors" style={{ color: 'red' }}>
                    {errors?.length > 0 && errors?.map((error, id) => (
                        <div key={id}>{error}</div>
                    ))
                    }
                </div>

                <div className="message_sender">
                    <Avatar className="message__avatar" {...stringAvatar(sessionUser.username)} />
                    {/* <img className="messenger__avatar" src={avatar} alt='avatar' /> */}
                    {/* {state.session?.user} */}
                    {/* <div className="form__container"> */}
                    {/* //! *************** From Starts *****************/}
                    <form onSubmit={handleSubmit}>
                        {/* <div className="form--top"> */}
                        <input className="post-input"
                            placeholder="What's on your mind?"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            autoFocus
                        // style={{ cursor: 'pointer' }}
                        />
                        {/* </div> */}

                        {/* <button className="btn-post" type="submit">
                                Hidden Post
                            </button> */}

                    </form>
                    {/* </div> */}
                    {/* //! *************** From Ends & Start Post Displays  *****************/}
                </div>

                <div className="posts-container">

                    <ul className="ul_posts">
                        {posts?.map((post) => (

                            <li className={"posted-posts"} key={post?.id}>

                                <div className="post__top">
                                    <div className="post__top-avatar">
                                        {/* <img src={avatar} alt='avatar' /> */}
                                        <Avatar className="post__avatar" {...stringAvatar(post?.owner)} />
                                    </div>
                                </div>

                                <div className="post__top-info">
                                    <div className="top__info-user">
                                        <span >{post?.owner} </span>
                                    </div>
                                    <div className="top__info-time">
                                        <span style={{ marginLeft: '5px' }}>Posted: <Timestamp relative date={post?.created_at} /></span>
                                    </div>
                                </div>

                                <div className="post_body">
                                    {post?.body}
                                </div>

                                < div className="edit-delete-post-wrapper">
                                    <EditPostsModal post={post} posts_id={post?.id} />
                                    <DeletePostButton post={post} />

                                    <AddCommentsModal post_id={post?.id} commentId={comment} />
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