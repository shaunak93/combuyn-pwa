import { combineReducers } from 'redux'

import addressReducer from './addressReducer';
import userReducer from './userReducer';
import tokenReducer from './tokenReducer';
import cartReducer from './cartReducer';

const rootReducer = combineReducers({
    address: addressReducer,
    user: userReducer,
    token: tokenReducer,
    cart: cartReducer
})

export default rootReducer;