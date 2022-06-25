import { createStore } from "redux";
import rootReducer from "./reducers/index";
const myStorage = window.localStorage;
let persistedState = {};
let address = myStorage.getItem('combuyn-current-address') || '{}';
let user = myStorage.getItem('combuyn-current-user') || '{}';
let token = myStorage.getItem('combuyn-current-token') || '{}';
let cart = myStorage.getItem('combuyn-cart') || '{}';


if(address || user || token || cart){
    persistedState.address = JSON.parse(address);
    persistedState.user = JSON.parse(user);
    persistedState.token = JSON.parse(token);
    persistedState.cart = JSON.parse(cart);
}

const store = createStore(rootReducer, persistedState);

store.subscribe(() => {
    let newState = store.getState();
    if(newState.address){
        myStorage.setItem('combuyn-current-address', JSON.stringify(newState.address || {}));
    }
    if(newState.user){
        myStorage.setItem('combuyn-current-user', JSON.stringify(newState.user || {}));
    }
    if(newState.token){
        myStorage.setItem('combuyn-current-token', JSON.stringify(newState.token || {}));
    }
    if(newState.cart){
        myStorage.setItem('combuyn-cart', JSON.stringify(newState.cart || {}));
    }
   
})

export default store;