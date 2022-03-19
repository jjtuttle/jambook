import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { EditPosts, getPosts } from '../../store/posts';

const EditPosts = ({ closeModal, posts }) => {
    const dispatch = useDispatch();
    const history = useHistory;
    const { postsId } = useParams();
    const id = posts.id

    console.log('id????????', id);

    const [ body, setBody ] = useState('posts.body');

    const handleSubmit = async (e) => {
        e.preventDefault();

        await dispatch(editPosts({
            id,
            body,
        }));
        await dispatch(getPosts(postsId));
        closeModal();
        return history.push(`/posts`);
    }

    return (
        <div>
            <h1>Edit Posts</h1>
            <form className="edit-posts-form" onSubmit={handleSubmit}>
                <textarea name="post"
                    id="" cols="30" rows="2"
                    placeholder="Start a session..."
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    style={{ borderRadius: '5px' }}
                />
                <div>
                    <button type='submit' className='btn edit-post-submit'>
                        Update Post
                    </button>
                </div>
            </form>
        </div>
    )

}

export default EditPosts;