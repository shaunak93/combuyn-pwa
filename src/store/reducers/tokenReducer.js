import { TOKEN_UPDATE } from '../constants';

const initialState = {};

function tokenReducer(state = initialState, action) {
    if (action.type === TOKEN_UPDATE) {
        return action.payload
    }
    return state;
};

export default tokenReducer;