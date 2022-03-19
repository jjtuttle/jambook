const CREATE_POST = 'post/create';
const GET_ALL_POST = 'post/get_all';
const GET_ONE_POST = 'post/get_one';
const UPDATE_POST = 'post/update';
const DELETE_POST = 'post/delete';

// todo ————————————————————————————————————————————————————————————————————————

// ===========================================================================
// ACTIONS
// ===========================================================================

const create = (posts) => ({ type: CREATE_POST, posts });
const getAll = (posts) => ({ type: GET_ALL_POST, posts });
const getOne = (posts) => ({ type: GET_ONE_POST, posts });
const update = (posts) => ({ type: UPDATE_POST, posts });
const destroy = (posts) => ({ type: DELETE_POST, posts });


// ===========================================================================
// THUNKS
// ===========================================================================

export const createPost = (posts) => async (dispatch) => {

    const response = await fetch('/api/posts/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(posts) //
    });

    if (response.ok) {
        const newPost = await response.json();
        dispatch(create(newPost));
        return 'failure'; // newPost
    }
    return response;
};


export const getPosts = () => async (dispatch) => {
    const response = await fetch(`/api/posts/all`, { method: 'GET' });

    if (response.ok) {
        const posts = await response.json();
        dispatch(getAll(posts));
        return posts;
    }
    return response;
}



export const getPost = (postId) => async (dispatch) => {
    const response = await fetch(`/api/posts/${postId}`, { method: 'GET' });

    if (response.ok) {
        const post = await response.json();
        dispatch(getOne(post));
        return post;
    }
    return response;
}


export const updatePost = (payload) => async (dispatch) => { // (post, postId)
    const response = await fetch(`/api/posts/${payload}`, { method: 'PUT', body: payload });

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
            const newState = { ...state };
            newState[ action.posts.id ] = action.posts;
            return newState;
        };
        case GET_ALL_POST: {
            const newState = {};
            action.posts[ 'all_posts' ].forEach((post) => newState[ post.id ] = post);
            return newState;
        };
        case GET_ONE_POST: {
            const newState = state;
            newState[ action.posts.id ] = action.post;
            return newState;
        };
        case UPDATE_POST: {
            const newState = state;
            newState[ action.posts.id ] = action.post;
            return newState;
        };
        case DELETE_POST: {
            const newState = state ;
            delete newState[ action.posts.id ];
            return newState;
        };
        default:
            return state;
    }
}



export default postReducer;








