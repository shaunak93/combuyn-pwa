import { 
    CART_PRODUCT_INC,
    CART_PRODUCT_DEC,
    CART_PRODUCT_REMOVE,
    CART_PRODUCT_ADD,
    CART_CAMPAIGN_REMOVE,
    CART_RESET
 } from '../constants';
 import _ from 'underscore';

let initialState = {
    apartmentId: null,
    cart: []
};

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

function cartReducer(state = initialState, action) {
    let newState = {
        ...initialState,
        ...(state || {})
    }
    if (action.type === CART_PRODUCT_INC) {
        let {payload} = action
        let {campaignId, product, attributes=[], campaignDetails} = payload;
        let {productId} = product;
        let campaignInCart = newState.cart.find(cmpn => cmpn.campaignId === campaignId);
        if(!campaignInCart){
            campaignInCart = {
                campaignId,
                campaignDetails,
                products: []
            }
            newState.cart.push(campaignInCart)
        }
        
        let productInCampaign = campaignInCart.products.find(
            (_product) => {
                console.log({_product});
                return (_product.productId === productId && areSameAttributes(attributes, _product.attributes))
            }
        )
        if(!productInCampaign){
            productInCampaign = {
               ...product,
               quantity: 0,
               attributes
            }
            campaignInCart.products.push(productInCampaign)
        }

        productInCampaign.quantity++;
        return newState;
    }
    if (action.type === CART_PRODUCT_DEC) {
        let {payload} = action
        let {campaignId, product, attributes=[]} = payload;
        let {productId} = product;
        let campaignInCart = newState.cart.find(cmpn => cmpn.campaignId === campaignId);

        if(campaignInCart){
            let productInCampaign = campaignInCart.products.find(
                (_product) => {
                    console.log({_product});
                    return (_product.productId === productId && areSameAttributes(attributes, _product.attributes))
                }
            )
            if(productInCampaign){
                productInCampaign.quantity--;
                if(productInCampaign.quantity < 1){
                    campaignInCart.products = campaignInCart.products.filter((product) => product !== productInCampaign);
                    if(campaignInCart.products.length < 1){
                        newState.cart = newState.cart.filter(cmp => cmp !== campaignInCart)
                    }
                }
            } 
        };
        
        return newState;
    }
    if (action.type === CART_PRODUCT_ADD) {
        let {payload} = action
        let {campaignId, product} = payload;
        let campaignInCart = newState.cart.find(cmpn => cmpn.campaignId === campaignId);
        if(!campaignInCart){
            campaignInCart = {
                campaignId: campaignId,
                products: []
            }
            newState.cart.push(campaignInCart)
        }
        campaignInCart.products.push(product);
        return newState;    
    }
    if (action.type === CART_PRODUCT_REMOVE) {
        let {payload} = action
        let {campaignId, productId} = payload;

        let campaignInCart = newState.cart.find(cmpn => cmpn.campaignId === campaignId);
        campaignInCart.products = campaignInCart.products.filter(product => product.productId !== productId);

        if(!campaignInCart.products.length){
            newState.cart = newState.cart.filter(cmpn => cmpn.campaignId !== campaignId)
        }
        return newState;
    }
    if (action.type === CART_CAMPAIGN_REMOVE) {
        let {payload} = action
        let {campaignId} = payload;

        let campaignsInCart = newState.cart.filter(cmpn => cmpn.campaignId !== campaignId);
        newState.cart = campaignsInCart;
        return newState;
    }
    if (action.type === CART_RESET) {
        return { 
            apartmentId: action.payload.apartmentId,
            cart: []
        }
    }
    return newState;
};

function areSameAttributes(attr1, attr2){
    if(attr1 && attr2 && attr1.length === attr2.length){
        if(attr1.length === 0){
            return true
        }
        let attr1Obj = attr1.reduce((prev, curr) => {prev[curr.name] = curr.value; return prev;}, {})
        let attr2Obj = attr2.reduce((prev, curr) => {prev[curr.name] = curr.value; return prev;}, {})
        return _.isEqual(attr1Obj, attr2Obj);
    }
    return false;
}

export default cartReducer;