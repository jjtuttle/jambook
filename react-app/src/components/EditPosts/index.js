import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { updatePost, getPosts } from '../../store/posts';
import './EditPostModal.css';

const EditPostsForm = ({ closeModal, posts }) => {

    const dispatch = useDispatch();
    const history = useHistory;

    const sessionUser = useSelector(state => state?.session?.user);

    // console.log("POstsEditFtrom```````````````````", posts.id);
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

            await dispatch(getPosts()); // posts.id
            closeModal();
            // return history.push(`/`);
        } else {
            alert("Please enter something.")
        }
    }


    return (
        <div className="edit_postM">
            <h1 className="h1_edit_post">Edit Post</h1>
            <form className="edit-posts-form" onSubmit={handleSubmit}>
                <input className="post__inputM"
                    autoFocus
                    // placeholder="Start a session..."
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                // style={{ borderRadius: '5px' }}
                />
            </form>
            <div className="edit_btn_postM">
                <button type='submit' className='edit_post_submitM'
                // disabled={!body}
                >
                    Update Post
                </button>
            </div>

        </div>
    )

}

export default EditPostsForm;