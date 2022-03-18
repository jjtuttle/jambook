import { useHistory, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost, getPosts } from '../../store/posts';
import React from 'react';
import './Posts.css';


const PostForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    // todo ————————————————————————————————————————————————————————————————————————
    const postsObj = useSelector(state => state?.posts);
    const posts = Object.values(postsObj);
    // todo ————————————————————————————————————————————————————————————————————————
    const { postId } = useParams();


    const owner_id = useSelector(state => state?.session?.user);

    const [ body, setBody ] = useState('');
    const [ errors, setErrors ] = useState([]);

    useEffect(() => {
        dispatch(getPosts(postId))
    }, [ dispatch, postId ]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('owner_id', owner_id);
        formData.append('body', body);

        const created = await dispatch(createPost(formData));
        if (created?.errors) setErrors(created?.errors);
        if (created?.id) {
            history.pushState(`/posts/${created.id}`);
            return created;
        }
        return 'Failed to create post!';
    }

    return (
        <>
            <div>
                <h1>** Posts **</h1>
                <div className="form-container">
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
                    </form>
                    <div className="post-container">
                        { }
                    </div>
                </div>
                <div className="posts-container">
                    <h1>Posts Wall</h1>
                    {posts?.map((post) => (
                        <li className={"posted-posts"} key={post?.id}>
                            {post?.body}
                        </li>
                    ))}
                </div>
            </div>
        </>
    );
};

export default PostForm;