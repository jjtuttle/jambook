import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { updateComment, getAllComments } from '../../store/comments';

const EditCommentsForm = ({ closeModal, comments }) => {
    
    const dispatch = useDispatch();
    const history = useHistory;
    const { commentId } = useParams();

    const sessionUser = useSelector(state => state?.session?.user);

    // console.log("Comment EditFtrom```````````````````", sessionUser.id);
    const id = comments.id


    const [ comment, setComment ] = useState(comments.body);

    //! EDIT
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (comment !== "") {
            await dispatch(updateComment({
                id,
                writer_id: +sessionUser.id,
                comment,
            }));

            await dispatch(getAllComments(commentId));
            closeModal();
            // return history.push(`/`);
        } else {
            alert("Please enter something.")
        }
    }

    return (
        <div>
            <h1>Edit Comments</h1>
            <form className="edit-comments-form" onSubmit={handleSubmit}>
                <input name="comments"
                    id="" cols="30" rows="2"
                    value={comments}
                    onChange={(e) => setComment(e.target.value)}
                    style={{ borderRadius: '5px' }}
                />
                <div>
                    <button type='submit' className='btn edit-comment-submit'>
                        Update Comment
                    </button>
                </div>
            </form>
        </div>
    )

}

export default EditCommentsForm;