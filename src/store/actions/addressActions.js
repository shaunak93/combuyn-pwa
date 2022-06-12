import {ADDRESS_UPDATE} from '../constants'

const updateAddressAction = (payload) => {
    return { type: ADDRESS_UPDATE, payload }
};

export { updateAddressAction };