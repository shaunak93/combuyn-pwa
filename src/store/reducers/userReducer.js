import { USER_UPDATE } from '../constants';

const initialState = {};

function userReducer(state = initialState, action) {
    if (action.type === USER_UPDATE) {
        return action.payload
    }
    return state;
};

export default userReducer;