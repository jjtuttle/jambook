import { useHistory, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, getPosts, deletePost } from '../../store/posts';
import React from 'react';
import match from '../../utils/match';
import './Posts.css';
import EditPostsModal from '../EditPosts/EditPostsModal';
import DeletePostButton from './DeletePostButton';
import Comments from '../Comments/Comments'
import avatar from '../../images/profile-icon.png';

const PostForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    // todo ————————————————————————————————————————————————————————————————————————
    const postsObj = useSelector(state => state?.posts);
    const posts = Object.values(postsObj);
    // todo ————————————————————————————————————————————————————————————————————————
    const { postId } = useParams();

    const sessionUser = useSelector(state => state?.session?.user);

    const [ body, setBody ] = useState('');
    const [ errors, setErrors ] = useState([]);

    const matchUserToOwner = match(sessionUser, postId);

    useEffect(() => {
        dispatch(getPosts(postId))
    }, [ dispatch, postId ]);

    //!CREATE
    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            owner_id: sessionUser.id,
            body
        }
        dispatch(createPost(payload))
        setBody('');
    }

    //! DELETE
    const handleDelete = async (postId) => {
        await dispatch(deletePost(postId));
    }

    // console.log("POST-ID for DELETE;;;;;;;", posts[ 0 ].id);

    return (
        <>
            <div>
                <h1>** Posts **</h1>
                <div className="form-container">
                    {/* //! *************** From Starts *****************/}
                    <form className="form" onSubmit={handleSubmit}>
                        <input className="post"
                            id="" cols="30" rows="2"
                            placeholder="Start a session..."
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            style={{ borderRadius: '5px' }}
                        />
                        <div className="button">
                            <button type="submit">
                                Post
                            </button>
                        </div>
                    </form>
                    {/* //! *************** From Ends & Start Post Displays  *****************/}
                </div>

                <div className="posts-container">
                    <h1>Posts Wall</h1>
                    <ul>
                        {posts?.map((post) => (
                            <li className={"posted-posts"} key={post?.id}>
                                <div className="avatar">
                                    <img src={avatar} alt='avatar' style={{ width: '30px' }} />
                                    <span style={{ marginLeft: '10px', marginBottom: '25px' }}> {post?.owner}</span>
                                </div>
                                <div className="post-body">
                                    {post?.body}
                                </div>
                                < div className="edit-delete-post-wrapper">
                                    <EditPostsModal post={post} postsId={post.id} />
                                    <DeletePostButton post={post} />
                                </div>
                                <div className="comments-container">
                                    <Comments post={posts} />
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* //! *************** Display Errors *****************/}
                < div className="errors" >
                    {errors?.length > 0 && errors?.map((error, id) => (
                        <div key={id}>{error}</div>
                    ))
                    }
                </div>

            </div >
        </>
    );
};

export default PostForm;

//!  get post timestamp and display nicely
// <p>{new Date(created_at?.toDate()).toUTCString()}</p>