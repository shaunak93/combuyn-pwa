/* eslint-disable no-undef */

import React from 'react';
import CampaignNavHeader from '../common/CampaignNavHeader';
import CampaignCard from './common/CampaignCard';
import {getFulfilledPecentage, getCountdownTimeString, getSelectorsMeta, checkOrder, calculateCartPricing} from './utils';
import {createOrder} from '../../../apis/orders';
import { showToast } from '../../../utils/general';
let myStorage = window.localStorage;


const getOrderForCreateOrder = (order, productDetails) => {
    let orderForCreateOrder = {};
    let {campaign, campaign_address, buyer_address, quantity, buyer, product_meta} = order;
    let products = product_meta.map((meta) => {
        let {product_id, quantity} = meta;
        let obj = {product_id, quantity, product_meta:[]};
        Object.entries(meta).forEach(([key, value]) => {
            if(key !== 'product_id' && key !== 'quantity'){
                obj.product_meta.push(productDetails[key].find((option) => option.value == value).id)
            }
        })
        return obj;
    })
    orderForCreateOrder = {
        campaign, campaign_address, buyer_address, quantity, buyer,products
    }
    return orderForCreateOrder;
}

function Payment(props) {
    let {campaignDetails = {}, productDetails = {}, selectorsMeta={}, order, totalSellingPrice, totalOriginalPrice,optionalData, setOrder, setOptionalData, onBackClick, onNextClick} = props;
    let currentTime = new Date().getTime();
    let {
        name, link, is_active, start_datetime, end_datetime, image,
        smallDescription, 
        //original_price, selling_price,
        total_order_count, current_order_count, features
    } = campaignDetails;
    let {
        id, description, product_meta, product_image
    } = productDetails
    let productName = productDetails.name || '';
    let key = 'rzp_test_G8o8D3fkgTPIW7'

    const onPayNowClick = (e) => {
        e.preventDefault();
        console.log({order, productDetails});
        let orderForCreateOrder = getOrderForCreateOrder(order, productDetails);
        createOrder(orderForCreateOrder, (err, res)=>{
            if(err){
                showToast({type: 'error', message: err})
            }
            else{
                let {razorpay_data, order_data} = res;
                let {razorpay_order_data} = razorpay_data;
                let razorPayOptions = {
                    "key": key, // Enter the Key ID generated from the Dashboard
                    "amount": razorpay_order_data.amount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                    "currency": "INR",
                    "name": "ComBuyn",
                    "description": "Receipt: "+razorpay_order_data.id,
                    //"image": "https://example.com/your_logo",
                    "order_id": razorpay_order_data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                    "handler": function (response){
                        console.log(response.razorpay_payment_id);
                        console.log(response.razorpay_order_id);
                        console.log(response.razorpay_signature)
                        showToast({type: 'success', message: 'Order placed successfully'})
                        onNextClick();
                    },
                    "prefill": {
                        "name": myStorage.getItem('name'),
                        "email": myStorage.getItem('email'),
                        "contact": myStorage.getItem('mobile'),
                    },
                    "notes": {
                        "address": "ComBuyn Corporate Office"
                    },
                    "theme": {
                        "color": "#3785B8"
                    }
                }
                var rzp1 = new Razorpay(razorPayOptions);
                rzp1.on('payment.failed', function (response){
                    showToast({type: 'error', message: response.error.reason})
                });
                rzp1.open();
                
                console.log(razorPayOptions);
            }
        })
        // let serverOrder =  {
        //     "id": "order_ICQnXWGJo8wzTr",
        //     "entity": "order",
        //     "amount": 100,
        //     "amount_paid": 0,
        //     "amount_due": 100,
        //     "currency": "INR",
        //     "receipt": "order-1212",
        //     "offer_id": null,
        //     "status": "created",
        //     "attempts": 0,
        //     "notes": [],
        //     "created_at": 1634912978
        // }
        // let key = 'rzp_test_G8o8D3fkgTPIW7'
    
        // var razorPayOptions = {
        //     "key": key, // Enter the Key ID generated from the Dashboard
        //     "amount": "10", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        //     "currency": "INR",
        //     "name": "ComBuyn",
        //     "description": "Receipt: order-1212",
        //     //"image": "https://example.com/your_logo",
        //     "order_id": serverOrder.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        //     "handler": function (response){
        //         alert(response.razorpay_payment_id);
        //         alert(response.razorpay_order_id);
        //         alert(response.razorpay_signature)
        //     },
        //     "prefill": {
        //         "name": "Shaunak Acharya",
        //         "email": "shaunak.acharya1993@gmail.com",
        //         "contact": "8975667234"
        //     },
        //     "notes": {
        //         "address": "ComBuyn Corporate Office"
        //     },
        //     "theme": {
        //         "color": "#3785B8"
        //     }
        // };
        // var rzp1 = new Razorpay(razorPayOptions);
        // rzp1.on('payment.failed', function (response){
        //     alert(response.error.code);
        //     alert(response.error.description);
        //     alert(response.error.source);
        //     alert(response.error.step);
        //     alert(response.error.reason);
        //     alert(response.error.metadata.order_id);
        //     alert(response.error.metadata.payment_id);
        // });
        // rzp1.open();
    
    }
    
    return (
        <>
            <CampaignNavHeader onBackClick={onBackClick}/>
            <div style={{position: 'relative', height: '27px', margin: '20px 30px 0', boxSizing:'border-box', borderRadius: '13px', backgroundColor: '#F7F7F7'}}>
                <div style={{display: 'inline-block', position: 'relative', height: 'inherit', width: '100%', backgroundColor: '#48C28B', borderRadius: '13px'}}>
                    <span style={{display: 'inline-block', fontSize: '12px', width: '33%', fontWeight: 'bold', color:'#ffffff', textAlign: 'center', paddingTop: '5px' }}>Cart</span>
                    <span style={{fontSize: '12px', display: 'inline-block', width: '33%', height: 'inherit', fontWeight: 'bold', color: '#ffffff', textAlign: 'center', paddingTop: '5px'}}>Order summery</span>
                    <span style={{fontSize: '12px', display: 'inline-block',width: '33%', height: 'inherit', fontWeight: 'bold', color: '#ffffff', textAlign: 'center', paddingTop: '5px'}}>Payment</span>
                </div>
            </div>
            <div>
                <CampaignCard
                    product_image = {product_image}
                    campaignName = {name}
                    smallDescription = {smallDescription}
                    total_selling_price = {totalSellingPrice}
                    total_original_price = {totalOriginalPrice}
                />
            </div>
            
            <div style={{position: 'relative', height: '119px', margin: '20px 30px 0', padding: '11px', backgroundColor: '#E6E6E6', boxSizing:'border-box', borderRadius: '4px'}}>
                    <div style={{position: 'relative', height: 'auto', width: 'inherit', boxSizing: 'border-box'}}>
                        <span style={{ color: '#016FB8', fontSize: '16px', fontWeight: 'bold'}}>Campaign Details</span>
                        {is_active &&
                            <div style={{display: 'inline-block', float: 'right', width:'102px', height: '18px', backgroundColor: '#48C28B', color: '#ffffff', borderRadius: '11px', textAlign: 'center', fontSize: '12px', fontWeight: 'bold', paddingTop: '4px'}}>Active</div>
                        }
                    </div>
                    <div style={{position: 'relative', height: 'auto', width: 'inherit', marginTop: '10px',boxSizing: 'border-box'}}>
                        <span style={{ color: '#016FB8', fontSize: '12px'}}>Minimum order : {total_order_count}</span>
                    </div>
                    <div style={{position: 'relative', height: '21px', width: 'inherit', marginTop: '8px',  padding: '3px', backgroundColor: '#FFFFFF', boxSizing:'border-box', borderRadius: '11px'}}>
                        <div style={{borderRadius: '8px',  width: `${getFulfilledPecentage(current_order_count, total_order_count)}%`, height:'15px', backgroundColor:'#48C28B', minWidth: 'min-content'}}>
                            <p style={{color: '#ffffff', fontSize: '8px', width: 'fit-content', margin: '0', padding: '2px 4px', fontWeight:'bold', float: 'right'}}>{`${getFulfilledPecentage(current_order_count, total_order_count)}%`}</p>
                        </div>
                    </div>
                    <p style={{margin: '0', width: 'inherit', textAlign: 'center', color: '#016FB8', fontSize: '12px', padding: '7px'}}>{getCountdownTimeString(end_datetime, currentTime)}</p>
                </div>

            <div onClick={onPayNowClick} style={{position: 'absolute', height: '48px', width: 'calc(100% - 60px)', bottom: '10px', margin: '20px 30px 0', boxSizing:'border-box', backgroundColor:'#FFA64D',width: 'calc(100% - 60px)',margin: '10px 30px 0', boxSizing:'border-box', borderRadius: '5px', textAlign: 'center', color: '#ffffff', fontSize: '20px', fontWeight: 'bold', paddingTop: '10px'}}>
                Pay Now
            </div>
        </>
    );
}

export default Payment;