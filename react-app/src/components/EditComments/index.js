import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { updateComment, getAllComments, createComment } from '../../store/comments';
import './EditCommentModal.css'


const EditCommentsForm = ({ closeModal, comment }) => { // postId,

    const dispatch = useDispatch();
    const history = useHistory();

    // const sessionUser = useSelector(state => state?.session?.user);

    const id = comment.id;
    const [ context, setContext ] = useState(comment.comment); // comments.comment

    //! EDIT
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("PRINT SUBMIT??????");

        if (comment !== "") {
            dispatch(updateComment({
                id,
                comment: context,
            }));

            dispatch(getAllComments());
            closeModal();
            // return history.push(`/`);
        } else {
            alert("Please enter something.")
        }
    }

    return (
        <div className="edit_commentM-div">
            <h1 style={{ textAlign: 'center', color: '#719ece' }}>Edit Comment</h1>
            <form className="edit__comments-form" onSubmit={handleSubmit}>
                <input name="edit__input-comments"
                    // id="" cols="30" rows="2"
                    value={context}
                    onChange={(e) => setContext(e.target.value)}
                    autoFocus
                    style={{
                        borderRadius: '5px', marginTop: '10px', width: '60vw',
                        height: '3vh', fontSize: '17px', border: '1px solid blue', boxShadow: '0 0 5px #719ece',
                        caretColor: 'blue', paddingLeft:'10px'
                    }}
                />

                <p style={{ fontSize: 'small', textAlign: 'center', marginTop: '6px', color: 'grey' }}>Enter 1 to 255 characters and Submit</p>
                <div className="edit_btn_commentM">
                    <button type='submit' className='edit_comment_submitM'
                    style={{ borderRadius: '5px' }}
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )

}

export default EditCommentsForm;