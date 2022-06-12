import { combineReducers } from 'redux'

import articleReducer from './articleReducer';
import addressReducer from './addressReducer';
import userReducer from './userReducer';
import tokenReducer from './tokenReducer';
import cartReducer from './cartReducer';

const rootReducer = combineReducers({
    article: articleReducer,
    address: addressReducer,
    user: userReducer,
    token: tokenReducer,
    cart: cartReducer
})

export default rootReducer;