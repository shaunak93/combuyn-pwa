import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";

import ProductDetails from '../flows/campaign/products/ProductDetails';
import Cart from '../flows/campaign/products/Cart';
import OrderSummary from '../flows/campaign/products/OrderSummary';
import Payment from '../flows/campaign/products/Payment';
import PaymentConfirmed from '../flows/campaign/products/PaymentConfirmed';
import OrderConfirmed from '../flows/campaign/products/OrderConfirmed';
import LoaderOverlay from '../components/base/LoaderOverlay';

import {getSelectorsMeta} from '../flows/campaign/products/utils';
import {getCampaignProductDetails} from '../apis/product';

let myStorage = window.localStorage;


let states = {
    home: {key: 'home', label: 'Home', previousState: null, nextState: 'cart'},
    cart: {key: 'cart', label: 'cart', previousState: 'home', nextState: 'orderSummary' },
    orderSummary: {key: 'orderSummary', label: 'Order Summery', previousState: 'cart', nextState: 'payment'},
    payment: {key: 'payment', label: 'Payment', previousState: 'orderSummary', nextState: 'paymentConfirmed'},
    paymentConfirmed: {key: 'paymentConfirmed', label: 'Payment Confirmed', previousState: 'payment', nextState: null},
    error: {key: 'error', label: 'Error', previousState: 'null', nextState: 'null'}
}

const getState = (state, key) => {
    return states[state][key]
}

const useCostCalculator = ({order, selectorsMeta, campaignDetails}) => {
    let {original_price, selling_price} = campaignDetails;
    const [totalSellingPrice, setTotalSellingPrice] = useState(campaignDetails.selling_price);
    const [totalOriginalPrice, setTotalOriginalPrice] = useState(original_price);
    useEffect(() => {
        let tempTotalSelling = 0;
        let tempTotalOriginal = 0;  
        let product_meta = order.product_meta;
        (product_meta || []).forEach((product) => {
            let extraCost = 0;
            let finalCost = selling_price;
            let finalMrp = original_price;
            Object.keys(product).forEach((key) => {
                if(key != 'product_id' && key != 'quantity'){
                    let options = selectorsMeta[key];
                    let selectedOption = options.find(option => option.value == product[key]);
                    extraCost = extraCost + Number(selectedOption.extra_price || 0);
                }
            })
            finalCost = (finalCost + extraCost) * (product.quantity || 1);
            finalMrp = (finalMrp + extraCost) * (product.quantity || 1);
            tempTotalSelling = tempTotalSelling + finalCost;
            tempTotalOriginal = tempTotalOriginal + finalMrp;
         })
         setTotalSellingPrice(tempTotalSelling);
         setTotalOriginalPrice(tempTotalOriginal)
    }, [order, selectorsMeta, campaignDetails])

    return {totalSellingPrice, totalOriginalPrice};
}

function Campaign(props) {
    const [campaignDetails, setCampaignDetails] = useState({});
    const [productDetails, setProductDetails] = useState({});
    const [selectorsMeta, setSelectorsMeta] = useState({})
    const [state, setState] = useState('home');
    const [order, setOrder] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [optionalData, setOptionalData] = useState({});
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [currentCoordinates, setCurrentCoordinates] = useState(null);

    let {totalSellingPrice, totalOriginalPrice} = useCostCalculator({campaignDetails, selectorsMeta, order});
    let history = useHistory();
    let { id } = useParams();
    
    const onClose = () => {
        history.push('/home')
    }

    const onBackClick = () => {
        if(state === 'home'){
            onClose();
        }
        else{
            setState(getState(state, 'previousState'));
        }
    }

    const onNextClick = () => {
        if(state === 'paymentConfirmed'){
            onClose();
        }
        else{
            setState(getState(state, 'nextState'));
        }
    }

    const getComponent = () => {
        switch (state) {
            case 'error':
                return <div style={{height: '100px', textAign:'center', paddingTop: '50px'}}>
                    Unable to fetch campaign
                </div>;
            case 'cart':
                return <Cart 
                    campaignDetails={campaignDetails}
                    productDetails={productDetails}
                    selectorsMeta={selectorsMeta}
                    order={order}
                    totalSellingPrice={totalSellingPrice}
                    totalOriginalPrice={totalOriginalPrice}
                    optionalData={optionalData}
                    setOrder={setOrder}
                    onBackClick={onBackClick}
                    onNextClick={onNextClick}
                    setSelectedAddress={setSelectedAddress}
                    setOptionalData={setOptionalData}
                />;

            case 'orderSummary':
                return <OrderSummary 
                    campaignDetails={campaignDetails}
                    productDetails={productDetails}
                    order={order}
                    totalSellingPrice={totalSellingPrice}
                    totalOriginalPrice={totalOriginalPrice}
                    setOrder={setOrder}
                    onBackClick={onBackClick}
                    onNextClick={onNextClick}
                    optionalData={optionalData}
                />;
            case 'payment':
                return <Payment 
                    campaignDetails={campaignDetails}
                    productDetails={productDetails}
                    order={order}
                    totalSellingPrice={totalSellingPrice}
                    totalOriginalPrice={totalOriginalPrice}
                    setOrder={setOrder}
                    onBackClick={onBackClick}
                    onNextClick={onNextClick}
                />;
            case 'orderConfirmed':
                return <OrderConfirmed 
                    campaignDetails={campaignDetails}
                    productDetails={productDetails}
                    order={order}
                    totalSellingPrice={totalSellingPrice}
                    totalOriginalPrice={totalOriginalPrice}
                    setOrder={setOrder}
                    onBackClick={onBackClick}
                    onNextClick={onNextClick}
                />;
            case 'paymentConfirmed':
                return <PaymentConfirmed 
                    campaignDetails={campaignDetails}
                    productDetails={productDetails}
                    order={order}
                    totalSellingPrice={totalSellingPrice}
                    totalOriginalPrice={totalOriginalPrice}
                    setOrder={setOrder}
                    onBackClick={onBackClick}
                    onNextClick={onNextClick}
                    optionalData={optionalData}
                />;
            case 'home':
            default:
                 return <ProductDetails 
                    campaignDetails={campaignDetails}
                    productDetails={productDetails}
                    selectorsMeta={selectorsMeta}
                    order={order}
                    totalSellingPrice={totalSellingPrice}
                    totalOriginalPrice={totalOriginalPrice}
                    currentCoordinates={currentCoordinates}
                    setOrder={setOrder}
                    onBackClick={onClose}
                    onNextClick={onNextClick}
                    setCurrentCoordinates={setCurrentCoordinates}
                />;
        }
    }

    useEffect(() => {
        if(!id){
            history.push('/home')
        }
        setIsLoading(true)
        getCampaignProductDetails(id, (err, res) => {
            if(err){
                setState('error')
                setIsLoading(false);
            }
            else{
                let {campaign, product} = res;
                let newOrder = {
                    "campaign": campaign.id,
                    "quantity": campaign.min_order_count,
                    "campaign_address": campaign.campaign_meta[0].address.id,
                    "product_meta": [
                        {
                            "product_id": product && product[0].id,
                            "quantity":  1
                        }
                    ]
                }
                setCampaignDetails(campaign);
                setProductDetails(product[0]);
                setSelectorsMeta(getSelectorsMeta(product[0]))
                setOrder(newOrder);
                setIsLoading(false)
                
            }
        })
    }, [])  


    return (
        <div style={{height: '100%', width: '100%'}}>
             {(isLoading) ? <LoaderOverlay show={isLoading}/> : getComponent()}
        </div>
    );
}

export default Campaign;