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



