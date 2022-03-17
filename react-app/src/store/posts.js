const CREATE_POST = 'post/create';
const GET_ALL_POST = 'post/get_all';
const UPDATE_POST = 'post/update';
const DELETE_POST = 'post/delete';

// todo ————————————————————————————————————————————————————————————————————————

// ===========================================================================
// ACTIONS
// ===========================================================================

const create = post => ({ type: CREATE_POST, post });
const getAll = posts => ({ type: GET_ALL_POST, posts });
const update = posts => ({ type: UPDATE_POST, posts });
const destroy = posts => ({ type: DELETE_POST, posts });


// ===========================================================================
// THUNKS
// ===========================================================================

export const createPost = post => async (dispatch) => {
    const response = await fetch(`/api/posts/new`, { method: 'POST', body: post });

    if (response.ok) {
        const newPost = await response.json();
        dispatch(create(newPost));
        return newPost;
    }
    return response;
};


export const getPost = () => async (dispatch) => {
    const response = await fetch(`/api/posts/all`, { method: 'GET' });

    if (response.ok) {
        const posts = await response.json();
        dispatch(getAll(posts));
        return posts;
    }
    return response;
}


export const updatePost = (post, postId) => async (dispatch) => {
    const response = await fetch(`/api/posts/${postId}`, { method: 'PUT', body: post });

    if (response.ok) {
        const updatedPost = await response.json();
        dispatch(update(updatedPost));
        return updatedPost;
    }
    return response;
}



export const deletePost = (postId) => async (dispatch) => {
    const response = await fetch(`/api/posts/${postId}`, { method: 'DELETE' });

    if (response.ok) {
        const postID = await response.json();
        dispatch(destroy(postID));
        return postID;
    }
    return response;
}


// ===========================================================================
// REDUCER
// ===========================================================================

const postReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_POST: {
            const newState = state;
            newState[ action.post.id ] = action.post;
            return newState;
        };
        case GET_ALL_POST: {
            const newState = {};
            action.post[ 'all_posts' ].forEach(post => newState[ post.id ] = post);
            return newState;
        };
        case UPDATE_POST: {
            const newState = state;
            newState[ action.post.id ] = action.post;
            return newState;
        };
        case DELETE_POST: {
            const newState = state;
            delete newState[ action.post.id ];
            return newState;
        };
        default:
            return state;
    }
}



export default postReducer;








