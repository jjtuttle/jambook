import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { updateComment, getAllComments, createComment } from '../../store/comments';

const EditCommentsForm = ({ closeModal, postId, comments }) => {

    const dispatch = useDispatch();
    const history = useHistory;
    
   
    console.log("Comment EditFtrom```````````````````", comments);

    const sessionUser = useSelector(state => state?.session?.user);


    const [ comment, setComment ] = useState(''); // comments.comment

    //! EDIT
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (comment !== "") {
            await dispatch(createComment({
                // id,
                writer_id: +sessionUser.id,
                comment,
            }));

            await dispatch(getAllComments());
            closeModal();
            // return history.push(`/`);
        } else {
            alert("Please enter something.")
        }
    }

    return (
        <div>
            <h1>Edit Comment</h1>
            <form className="add-comments-form" onSubmit={handleSubmit}>
                <input name="input-add-comments"
                    // id="" cols="30" rows="2"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    autoFocus
                    style={{ borderRadius: '5px' }}
                />
                <div>
                    <button type='submit' className='btn edit-comment-submit'>
                        Edit Comment
                    </button>
                </div>
            </form>
        </div>
    )

}

export default EditCommentsForm;