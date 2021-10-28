import React, { useState } from 'react';
import CampaignModalHeader from '../headers/CampaignModalHeader';
import ImageSlider from '../ImageSlider';
import LoginPopup from '../popups/LoginPopup';
import CampaignCard from './components/CampaignCard';
import LoaderOverlay from '../base/LoaderOverlay';
import { showToast } from '../../utils/general';
import {addUserAddress} from '../../apis/users';
let myStorage = window.localStorage;


const OtherInfoDiv = ({label, value}) => {
    return (<div style={{position: 'relative', height: 'auto', width: 'inherit', margin: '10px 36px 0', color: '#4D4D4D', boxSizing:'border-box', borderRadius: '4px', padding: '14px 13px 18px', backgroundColor: '#F7F7F7'}}>
        <div style={{display: 'inline-block', width: '65px', paddingRight: '10px', fontSize: '14px', fontWeight: 'bold', color: '#3785B8', margin: '0'}}>
            <span >{label}</span>
        </div>
        <div style={{display: 'inline-block', width: 'calc(100% - 75px)', fontSize: '12px', fontWeight: '500', color: '#4D4D4D'}}>
            <span >{value}</span>
        </div>
        
    </div>)
}

const ImportantNoteDiv = ({header, content}) => {
    return (<div style={{position: 'relative', height: 'auto', width: 'inherit', margin: '20px 36px 0', color: '#4D4D4D', boxSizing:'border-box', borderRadius: '8px', padding: '25px 15px', backgroundColor: '#D7EDFC'}}>
        {!!header && <p style={{fontSize: '12px', fontWeight: 'bold', margin: '0'}}>{header}</p>}
        {!!content && <p style={{fontSize: '12px', fontWeight: '500', marginTop: '25px'}}>{content}</p>}
    </div>)
}


function OrderSummary(props) {
    let {campaignDetails = {}, productDetails = {}, selectorsMeta={},
    order, totalSellingPrice, totalOriginalPrice, optionalData ,setOrder, onBackClick, onNextClick} = props;
    let {
        name, 
        smallDescription, specific_details, expected_delivery_date
    } = campaignDetails;
    let {
        id, description, product_meta, product_image
    } = productDetails
    let productName = productDetails.name || '';

    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const [isLoading, setIsLoading] = useState(false)

    const getTotalQuantity = () => {
        let orderProductMeta = (order && order.product_meta) || [];
        let totalQuantity = 0;
        orderProductMeta.forEach((meta) => {
            totalQuantity = totalQuantity + (meta.quantity || 0);
        })
        return totalQuantity;
    }

    const getAddress = () => {
        let address = (optionalData && optionalData.address) || {};
        console.log(optionalData);
        let addressArr = ['line1', 'line2', 'city', 'state', 'landmark'].map((key) => {
            return address[key] || ''
        })
        return addressArr.filter(val => val).join(', ');
    }

    const getReadableDate = () => {
        let date = new Date(expected_delivery_date);
        let d = date.getDate();
        let m = date.getMonth();
        let y = date.getFullYear()
        return `${d}-${m}-${y}`
        
    }
    

    const onClickProceed = () => {
        if(myStorage.getItem('access_token')){
            GoToNextPage();
        }
        else{
            setShowLoginPopup(true)
        }
    }

    const GoToNextPage = (access_token) => {
        setShowLoginPopup(false);
        setIsLoading(true);
        let address = {...optionalData.address};
        delete address.selectAddresListId;
        addUserAddress( {access: access_token, address},(err,res) => {
            setIsLoading(false);
            if(err){
                showToast({type: 'error', message: 'err'})
            }
            else{
                let addressId = res;
                console.log({
                    ...order,
                    buyer_address: res,
                    buyer : myStorage.getItem('buyer_id')
                });
                setOrder({
                    ...order,
                    buyer_address: res,
                    buyer : myStorage.getItem('buyer_id')
                })

                console.log({
                    ...order,
                    buyer_address: res,
                    buyer : myStorage.getItem('buyer_id')
                });
                onNextClick();
            }
        })

    }

    const closeLoginPopup = () => {
        setShowLoginPopup(false)
    }

    return (
        <>
            <CampaignModalHeader
                onBackClick={onBackClick}
            />

            <div style={{position: 'relative', height: '27px', width: 'inherit', margin: '20px 30px 0', boxSizing:'border-box', borderRadius: '13px', backgroundColor: '#F7F7F7'}}>
                <div style={{display: 'inline-block', position: 'relative', height: 'inherit', width: '66%', backgroundColor: '#3785B8', borderRadius: '13px'}}>
                    <span style={{display: 'inline-block', fontSize: '12px', width: '50%', fontWeight: 'bold', color:'#ffffff', textAlign: 'center', paddingTop: '5px' }}>Cart</span>
                    <span style={{fontSize: '12px', display: 'inline-block', width: '50%', height: 'inherit', fontWeight: 'bold', color: '#ffffff', textAlign: 'center', paddingTop: '5px'}}>Order summery</span>
                </div>
                <span style={{fontSize: '12px', display: 'inline-block',width: '33%', height: 'inherit', fontWeight: 'bold', color: '#3785B8', textAlign: 'center', paddingTop: '5px'}}>Payment</span>
            </div>

            <CampaignCard
                product_image = {product_image}
                campaignName = {name}
                smallDescription = {smallDescription}
                total_selling_price = {totalSellingPrice}
                total_original_price = {totalOriginalPrice}
            />
            <div style={{height: 'calc(100% - 400px)', overflowY: 'scroll'}}>
                <LoaderOverlay show={isLoading}/>
                <OtherInfoDiv 
                    label={"Items"}
                    value={`${getTotalQuantity()} pcs`}
                />
                <OtherInfoDiv
                    label={"Delivery Address"}
                    value={getAddress()}
                />
                <OtherInfoDiv
                    label={"Delivery By"}
                    value={getReadableDate()}
                />
                {!!(specific_details && (specific_details.para1 || specific_details.para1)) &&
                    <ImportantNoteDiv 
                        header={specific_details.para1}
                        content={specific_details.para1}
                    />
                }
                
            </div>
            <div onClick={onClickProceed} style={{position: 'absolute', height: '48px', width: 'calc(100% - 60px)', bottom: '10px', margin: '20px 30px 0', boxSizing:'border-box', backgroundColor:'#FFA64D',width: 'calc(100% - 60px)',margin: '10px 30px 0', boxSizing:'border-box', borderRadius: '5px', textAlign: 'center', color: '#ffffff', fontSize: '20px', fontWeight: 'bold', paddingTop: '10px'}}>
                Procced with Payment
            </div>
            {!!showLoginPopup && <LoginPopup
                callbackOnSuccess={GoToNextPage}
                onClose={closeLoginPopup}
            />}
        </>
    );
}

export default OrderSummary;