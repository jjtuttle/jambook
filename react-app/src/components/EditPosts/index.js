import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { updatePost, getPosts } from '../../store/posts';

const EditPostsForm = ({ closeModal, posts }) => {
    const dispatch = useDispatch();
    const history = useHistory;
    const { postsId } = useParams();

    const sessionUser = useSelector(state => state?.session?.user);

    // console.log("POstsEditFtrom```````````````````", sessionUser.id);
    const id = posts.id


    const [ body, setBody ] = useState(posts.body);

    //! EDIT
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (body !== "") {

            await dispatch(updatePost({
                id,
                owner_id: +sessionUser.id,
                body,
            }));

            await dispatch(getPosts(postsId));
            closeModal();
            // return history.push(`/`);
        } else {
            alert("Please enter something.")
        }
    }

    
    return (
        <div>
            <h1>Edit Posts</h1>
            <form className="edit-posts-form" onSubmit={handleSubmit}>
                <input name="post"
                    autoFocus
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

export default EditPostsForm;