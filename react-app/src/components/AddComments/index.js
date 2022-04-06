import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router-dom';
import { getAllComments, createComment } from '../../store/comments';
import './AddComments.css';


const AddCommentsForm = ({ closeModal, post_id }) => {
    const [ errors, setErrors ] = useState([]);

    const dispatch = useDispatch();
    // const history = useHistory;

    // postId undefined....
    // console.log("Comment AddCommentsForm post_idddddd```````````````````", post_id);

    const sessionUser = useSelector(state => state?.session?.user);

    const [ textCount, setTextCount ] = useState(0);
    const [ comment, setComment ] = useState(''); // comments.comment


    // useEffect(() => {
    //     const errors = [];
    //     if (comment.length < 5 || comment.length > 255) errors.push('Please provide a comment between 5 chars and 255 chars.');

        // setErrors(errors);
    // }, [ comment ])

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
            <h1 style={{ textAlign: 'center', color: '#719ece' }}>Add Comment</h1>

            <div className="display__errors-add-comment">
                {errors.map((error, ind) => (
                    <ul key={ind}><li>{error}</li></ul>
                ))}
            </div>

            <form className="add-comments-form" onSubmit={handleSubmit}
                style={{ margin: '10px' }}
            >

                <input name="add__comment-input"
                    // id="" cols="30" rows="2"
                    value={comment}
                    maxLength="255"
                    onChangeText={(body) => setTextCount({ body })}
                    onChange={(e) => setComment(e.target.value)}
                    autoFocus
                    placeholder={"Add your comment and press Enter to submit"}
                    style={{
                        borderRadius: '5px', marginTop: '10px', width: '60vw',
                        height: '3vh', fontSize: '15px', border: '1px solid blue', boxShadow: '0 0 5px #719ece',
                        caretColor: 'blue', paddingLeft: '10px'
                    }}
                />
                <div className='post__wordCount'>
                    Characters: {comment.length}/255
                </div>
                {/* <p style={{ fontSize: 'small', textAlign: 'center', marginTop: '6px', color: 'grey' }}>Enter 2 to 255 characters and Submit</p> */}
                <div className="add_btn_comment">
                    <button type='submit' className='add_comment_submit' style={{ borderRadius: '5px' }} >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )

}

export default AddCommentsForm;