import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  useHistory } from 'react-router-dom';
import {  getAllComments, createComment } from '../../store/comments';

const AddCommentsForm = ({ closeModal, post_id }) => {
    const [ errors, setErrors ] = useState([]);

    const dispatch = useDispatch();
    const history = useHistory;

    // postId undefined....
    // console.log("Comment AddCommentsForm post_idddddd```````````````````", post_id);

    const sessionUser = useSelector(state => state?.session?.user);


    const [ comment, setComment ] = useState(''); // comments.comment


    useEffect(() => {
        const errors = [];
        if (comment.length < 5 || comment.length > 255) errors.push('Please provide a comment between 5 chars and 255 chars.');

        setErrors(errors);
    }, [ comment ])

    //! EDIT
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (comment !== "") {
            await dispatch(createComment({
                post_id,
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
            <h1>Add Comment</h1>

            <div className="display__errors">
                {errors.map((error, ind) => (
                    <ul key={ind}><li>{error}</li></ul>
                ))}
            </div>

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
                        Add Comment
                    </button>
                </div>
            </form>
        </div>
    )

}

export default AddCommentsForm;