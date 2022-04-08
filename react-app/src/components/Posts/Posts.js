
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, getPosts, deletePost } from '../../store/posts';
import React from 'react';
// import match from '../../utils/match';
import './Posts.css';
import EditPostsModal from '../EditPosts/EditPostsModal';
import AddCommentsModal from '../AddComments/AddCommentsModal';
import DeletePostButton from './DeletePostButton';
import Comments from '../Comments/Comments'
import Avatar from '@mui/material/Avatar';
import Timestamp from 'react-timestamp';
import BackToTopButton from '../NavBar/BackToTopButton';
// import CharacterCounter from 'react-character-counter'
import { stringAvatar } from '../../utils/avatarColorPicker';



const PostForm = () => {
    // const [ count, setCount ] = useState(0);  // char counter


    const dispatch = useDispatch();
    // const history = useHistory();

    const postsObj = useSelector(state => state?.posts);
    const posts = Object.values(postsObj);

    // Sort Posts ASC by date
    posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    const comment = useSelector((state) => state?.commentReducer);

    const sessionUser = useSelector(state => state?.session?.user);
    const [textCount, setTextCount] = useState(0); 
    const [ body, setBody ] = useState('');
    // const [ errors, setErrors ] = useState([]);
    const errors = {}

    // const matchUserToOwner = match(sessionUser, postId);


    // const x = posts.map((p) =>  p.last)
    // console.log("SESSION USER Comp for POSTS................", x);

    useEffect(() => {
        dispatch(getPosts())
    }, [ dispatch,  ]); 

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
            <div className="post_container">
                {/* //! *************** Display Errors *****************/}
                < div className="errors" style={{ color: 'red' }}>
                    {errors?.length > 0 && errors?.map((error, id) => (
                        <div key={id}>{error}</div>
                    ))
                    }
                </div>

                <div className="message_sender">
                    <Avatar className="message__avatar" {...stringAvatar(sessionUser.first.concat(' ', sessionUser.last))} />
                    {/* <img className="messenger__avatar" src={avatar} alt='avatar' /> */}
                    {/* {state.session?.user} */}
                    {/* <div className="form__container"> */}
                    {/* //! *************** From Starts *****************/}
                    <form onSubmit={handleSubmit}>
                        {/* <div className="form--top"> */}
                        <input className="post-input"
                            maxLength="255"
                            placeholder="What's on your mind - press Enter to submit"
                            value={body}
                            onChangeText={(body) => setTextCount({body})}
                            onChange={(e) => setBody(e.target.value)}
                            autoFocus
                        // style={{ cursor: 'pointer' }}
                        />
                        <div className='post__wordCount'>
                        Characters: {body.length}/255
                        </div>

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
                                        <Avatar className="post__avatar" {...stringAvatar(post?.first.concat(' ', post?.last))} style={{ opacity: '.6' }} />
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

                        <BackToTopButton />
                    </ul>
                </div>
            </div >
        </>
    );
};

export default PostForm;

//!  get post timestamp and display nicely
// <p>{new Date(created_at?.toDate()).toUTCString()}</p>