const LOAD_SEARCH_RESULTS = 'search/LOAD_SEARCH_RESULTS';

const loadSearch = (posts) => ({
    type: LOAD_SEARCH_RESULTS,
    posts
})

export const getSearchResults = (keyword) => async (dispatch) => {
    console.log("Store Fecth...............", keyword);
    const response = await fetch(`/api/search/${keyword}`, {
        method: 'GET'
    });
    // console.log("Store REspons...............", response);

    if (response.ok) {
        const data = await response.json();
        dispatch(loadSearch(data));
        return data;
    }
    return response
}

const searchReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case LOAD_SEARCH_RESULTS:
            newState = {};
            action.posts[ 'post_by_body' ].forEach((post) => newState[ post.id ] = post);
            // console.log('REDUCER---===--==-=-=-=-=-=->>>>>', newState);
            return newState;
        default:
            return state
    }
}

export default searchReducer
