import { ADDRESS_UPDATE } from '../constants';

const initialState = {
    apartmentId: null,
    apartmentName: null,
    towerId: null,
    towerName: null,
    flatNumber: null
};

function addressReducer(state = initialState, action) {
    if (action.type === ADDRESS_UPDATE) {
        return action.payload
    }
    return state;
};

export default addressReducer;