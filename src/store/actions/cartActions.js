import {
    CART_PRODUCT_INC,
    CART_PRODUCT_DEC,
    CART_PRODUCT_REMOVE,
    CART_PRODUCT_ADD,
    CART_CAMPAIGN_REMOVE,
    CART_RESET
} from '../constants'

/**
 * 
 * @param {*} payload 
 * @returns 
 * {
            "campaignId": "621cd46cfd514d259593e676",
            "products": [
                {
                    "productId": "620b3a8f4a484f0ce21243cf",
                    "vendorId": "6215dc061b12325d41fc27ee",
                    "quantity": 2,
                    "price": 100,
                    "attributes":[{
                        "name": "weight",
                        "value": "250"
                    }]
                }
            ]
        }
 * 
 */


const increaseProductQuantity = (payload) => {
    return { type: CART_PRODUCT_INC, payload }
};

const decreaseProductQuantity = (payload) => {
    return { type: CART_PRODUCT_DEC, payload }
};

const removeProduct = (payload) => {
    return { type: CART_PRODUCT_REMOVE, payload }
};

const addProduct = (payload) => {
    return { type: CART_PRODUCT_ADD, payload }
};

const removeCampaign = (payload) => {
    return { type: CART_CAMPAIGN_REMOVE, payload }
};


const resetCart = (payload) => {
    return { type: CART_RESET, payload }
}


export { increaseProductQuantity, decreaseProductQuantity, removeProduct, addProduct, removeCampaign, resetCart };