import { useHistory, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost, getPosts, deletePost } from '../../store/posts';
import React from 'react';
import match from '../../utils/match';
import './Posts.css';
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


    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            owner_id: sessionUser.id,
            body
        }
        dispatch(createPost(payload))
    }

    const handleDelete = async (postsId) => {
        console.log("HANDLE DELETE ---------------", posts[0].id);
        await dispatch(deletePost(postsId));
    }

    // console.log("POST-ID for DELETE;;;;;;;", posts[0].id);

    return (
        <>
            <div>
                <h1>** Posts **</h1>
                <div className="form-container">
                    {/* //! *************** From Starts *****************/}
                    <form className="form" onSubmit={handleSubmit}>
                        <textarea name="post"
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
                        {/* //! *************** From Ends & Start Post Displays  *****************/}
                    </form>
                    <div className="post-container">
                        { }
                    </div>
                </div>
                <div className="posts-container">
                    <h1>Posts Wall</h1>

                    {posts?.map((post) => (
                        <li className={"posted-posts"} key={post?.id}>
                            <div className="avatar">
                                <img src={avatar} alt='avatar' style={{ width: '30px' }} />
                                <span style={{ marginLeft: '10px', marginBottom: '25px' }}> {posts[ 0 ]?.owner}</span>
                            </div>
                            {post?.body}

                            <div className="delete-btn-container">
                                matchUserToOwner &&(
                                <button className="btn btn-delete-post"
                                    onClick={() => handleDelete(posts[0]?.id)} >
                                    Delete
                                </button>
                            </div>
                    })
                        </li>
                    ))}

                    {/* //! *************** Display Errors *****************/}
                    <div className="errors">
                        {errors?.length > 0 && errors?.map((error, id) => (
                            <div key={id}>{error}</div>
                        ))
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default PostForm;