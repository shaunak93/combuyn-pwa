import {USER_UPDATE} from '../constants'

const updateUser = (payload) => {
    return { type: USER_UPDATE, payload }
};

export { updateUser };