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
        <div className="edit_postM-div">
            <h1 style={{ textAlign: 'center', color: '#719ece' }}>Edit Post</h1>

            <form className="edit__posts-form" onSubmit={handleSubmit} style={{ margin: '10px' }}>
                <input className="post__inputM"
                    autoFocus
                    maxLength="255"
                    // placeholder="Start a session..."
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    style={{
                        borderRadius: '5px', marginTop: '10px', width: '60vw',
                        height: '3vh', fontSize: '15px', border: '1px solid blue', boxShadow: '0 0 5px #719ece',
                        caretColor: 'blue', paddingLeft: '10px'
                    }}
                />

                <p style={{ fontSize: 'small', textAlign: 'center', marginTop: '6px', color: 'grey' }}>Enter 2 to 255 characters and press Enter to Submit</p>
                <div className="edit_btn_postM">
                    <button type='submit' className='edit_post_submitM'
                        style={{ borderRadius: '5px' }}
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )

}

export default EditPostsForm;