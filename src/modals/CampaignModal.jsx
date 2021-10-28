import React, {useEffect, useState} from 'react';


import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup';

import BasicModal from '../components/base/BasicModal';
import CampaignHome from '../components/campaign-flow/CampaignHome';
import Cart from '../components/campaign-flow/Cart';
import OrderSummary from '../components/campaign-flow/OrderSummary';
import Payment from '../components/campaign-flow/Payment';
import PaymentGateway from '../components/campaign-flow/PaymentGateway';
import PaymentConfirmed from '../components/campaign-flow/PaymentConfirmed';
import OrderConfirmed from '../components/campaign-flow/OrderConfirmed';
import LoaderOverlay from '../components/base/LoaderOverlay';

import {getSelectorsMeta} from '../components/campaign-flow/utils';


import {getCampaignProductDetails} from '../apis/product';
import { ContactsOutlined } from '@material-ui/icons';

let myStorage = window.localStorage;


let states = {
    home: {key: 'home', label: 'Home', previousState: null, nextState: 'cart'},
    cart: {key: 'cart', label: 'cart', previousState: 'home', nextState: 'orderSummary' },
    orderSummary: {key: 'orderSummary', label: 'Order Summery', previousState: 'cart', nextState: 'payment'},
    payment: {key: 'payment', label: 'Payment', previousState: 'orderSummary', nextState: 'paymentConfirmed'},
    //paymentGateway: {key: 'paymentGateway', label: 'Paymeny Gateway', previousState: null, nextState: 'capaymentConfirmedrt'},
    paymentConfirmed: {key: 'paymentConfirmed', label: 'Payment Confirmed', previousState: 'payment', nextState: null},
    //orderConfirmed: {key: 'orderConfirmed', label: 'Order Confirmed', previousState: null, nextState: 'null'}
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

function CampaignModal(props) {
    const  {campaignId, initialState, open, onClose} = props;

    const [campaignDetails, setCampaignDetails] = useState({});
    const [productDetails, setProductDetails] = useState({});
    const [selectorsMeta, setSelectorsMeta] = useState({})
    const [state, setState] = useState(initialState || '');
    const [order, setOrder] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAddress, setSelectedAddress] = useState(null)
    const [optionalData, setOptionalData] = useState({})

    let {totalSellingPrice, totalOriginalPrice} = useCostCalculator({campaignDetails, selectorsMeta, order});

    useEffect(() => {
        if(!campaignId) return;
        setIsLoading(true)
        getCampaignProductDetails(campaignId, (err, res) => {
            if(err){

            }
            else{
                let {campaign, product} = res;
                let newOrder = {
                    "campaign": campaign.id,
                    "buyer": myStorage.getItem('buyer_id') || 0,
                    "quantity": campaign.min_order_count,
                    "buyer_address": 14,
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
    }, [campaignId])    

    let onBackClick = () => {
        if(state === 'home'){
            onClose();
        }
        else{
            setState(getState(state, 'previousState'));
        }
    }

    let onNextClick = () => {
        if(state === 'paymentConfirmed'){
            onClose();
        }
        else{
            console.log(getState(state, 'nextState'));
            setState(getState(state, 'nextState'));
        }
    }

    let getComponent = () => {
        switch (state) {
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
                 return <CampaignHome 
                    campaignDetails={campaignDetails}
                    productDetails={productDetails}
                    selectorsMeta={selectorsMeta}
                    order={order}
                    totalSellingPrice={totalSellingPrice}
                    totalOriginalPrice={totalOriginalPrice}
                    setOrder={setOrder}
                    onBackClick={onClose}
                    onNextClick={onNextClick}
                />;
        }
    }

    return (
        <BasicModal 
            open={open}
        >
            {(isLoading) ? <LoaderOverlay show={isLoading}/> : getComponent()}
    </BasicModal>
    );
}

export default CampaignModal;