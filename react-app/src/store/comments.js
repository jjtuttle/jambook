const CREATE_COMMENT = 'comment/create';
const GET_ALL_COMMENT_BY_ID = 'comment/get_all_by_id';
const GET_ALL_COMMENTS = 'comment/get_all_comments';
const UPDATE_COMMENT = 'comment/update';
const DELETE_COMMENT = 'comment/delete';

// todo ————————————————————————————————————————————————————————————————————————
// ===========================================================================
// ACTIONS
// ===========================================================================

const create = (comment) => ({ type: CREATE_COMMENT, comment });
const getAllCommentById = (comment) => ({ type: GET_ALL_COMMENT_BY_ID, comment });
const getAllCommentsNoId = (comment) => ({ type: GET_ALL_COMMENTS, comment });
const update = (comment) => ({ type: UPDATE_COMMENT, comment });
const destroy = (comment) => ({ type: DELETE_COMMENT, comment });


// ===========================================================================
// THUNKS
// ===========================================================================
// Create a comment
export const createComment = (payload) => async (dispatch) => {

    const response = await fetch('/api/comments/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        const newComment = await response.json();
        dispatch(create(newComment));
        return 'failure';
    }
    return response;
};




// Get all 
export const getAllComments = () => async (dispatch) => {

    const response = await fetch(`/api/comments`, { method: 'GET' });
    if (response.ok) {
        const comment = await response.json();
        dispatch(getAllCommentsNoId(comment));
        return comment;
    }
    return response;
}




// Get comments by ID
export const getComment = (id) => async (dispatch) => {

    const response = await fetch(`/api/comments/${id}`, { method: 'GET' });
    if (response.ok) {
        const comment = await response.json();
        dispatch(getAllCommentById(comment));
        return comment;
    }
    return response;
}


// Update comment
export const updateComment = (payload) => async (dispatch) => {

    const response = await fetch(`/api/comments/${payload.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        const updatedComment = await response.json();
        dispatch(update(updatedComment));
        return updatedComment;
    }
}


// Delete comments
export const deleteComment = (commentId) => async (dispatch) => {
    const response = await fetch(`/api/comments/${commentId}`, { method: 'DELETE' });

    if (response.ok) {
        const commentID = await response.json();
        dispatch(destroy(commentID));
        return commentID;
    }
    return response;
}


// ===========================================================================
// REDUCER
// ===========================================================================
const commentReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_COMMENT: {
            const newState = { ...state };
            newState[ action.comment.id ] = action.comment;
            return newState;
        };
        case GET_ALL_COMMENT_BY_ID: {
            const newState = {}; //...state
            action.comment[ 'all_comment' ].forEach((comment) => newState[ comment.id ] = comment);
            return newState;
        };
        case GET_ALL_COMMENTS: {
            const newState = {}; //state;
            // newState[ action.comment.id ] = action.comment;
            action.comment[ 'all_comments' ].forEach((comment) => newState[ comment.id ] = comment);
            return newState;
        };
        case UPDATE_COMMENT: {
            const newState = { ...state };
            newState[ action.comment.id ] = action.comment;
            return newState;
        };
        case DELETE_COMMENT: {
            const newState = { ...state };
            delete newState[ action.comment.id ];
            return newState;
        };
        default:
            return state;
    }
}



export default commentReducer;














