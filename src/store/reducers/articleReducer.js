import { ADD_ARTICLE } from '../constants'

const initialState = {
    articles: []
};

function articleReducer(state = initialState, action) {
    if (action.type === ADD_ARTICLE) {
        return Object.assign({}, state, {
            articles: state.articles.concat(action.payload)
        });
    }

    return state;
};

export default articleReducer;