const CREATE_COMMENT = 'comment/create';
const GET_ALL_COMMENT = 'comment/get_all';
const GET_ONE_COMMENT = 'comment/get_one';
const UPDATE_COMMENT = 'comment/update';
const DELETE_COMMENT = 'comment/delete';

// todo ————————————————————————————————————————————————————————————————————————
// ===========================================================================
// ACTIONS
// ===========================================================================

const create = (comment) => ({ type: CREATE_COMMENT, comment });
const getAll = (comment) => ({ type: GET_ALL_COMMENT, comment });
const getOne = (comment) => ({ type: GET_ONE_COMMENT, comment });
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


// Get comments
export const getComment = (id) => async (dispatch) => {
    const response = await fetch(`/api/comments/${id}`, { method: 'GET' });

    if (response.ok) {
        const comment = await response.json();
        dispatch(getAll(comment));
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
        case GET_ALL_COMMENT: {
            const newState = { ...state };
            action.comment[ 'all_comments' ].forEach((comment) => newState[ comment.id ] = comment);
            return newState;
        };
        case GET_ONE_COMMENT: {
            const newState = state;
            newState[ action.comment.id ] = action.comment;
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














