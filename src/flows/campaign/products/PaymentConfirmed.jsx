import React from 'react';
import CampaignNavHeader from '../common/CampaignNavHeader';
import CampaignCard from './common/CampaignCard';
import WhatsappIcon from '../../../assets/whatsapp.png'
import InstagramIcon from '../../../assets/instagram.png'
import FacebookIcon from '../../../assets/facebook.png'
import ShareIcon from '../../../assets/share.png'

import {getFulfilledPecentage, getCountdownTimeString, getSelectorsMeta, checkOrder, calculateCartPricing} from './utils';



function PaymentConfirmed(props) {
    let {campaignDetails = {}, productDetails = {}, totalSellingPrice, totalOriginalPrice, order,optionalData, selectorsMeta, setOrder, onBackClick, onNextClick} = props;
    let currentTime = new Date().getTime();
    let {
        name, is_active, end_datetime,
        smallDescription, expected_delivery_date,
        total_order_count, current_order_count
    } = campaignDetails;
    let { product_image } = productDetails
    let productName = productDetails.name || '';

    const getReadableDate = () => {
        let date = new Date(expected_delivery_date);
        let d = date.getDate();
        let m = date.getMonth();
        let y = date.getFullYear()
        return `${d}-${m}-${y}`
    }

    const getAddress = () => {
        let address = (optionalData && optionalData.address) || {};
        console.log(optionalData);
        let addressArr = ['line1', 'line2', 'city', 'state', 'landmark'].map((key) => {
            return address[key] || ''
        })
        return addressArr.filter(val => val).join(', ');
    }

    return (
        <>
            <CampaignNavHeader onBackClick={onBackClick}/>
            <div style={{height: 'calc(100% - 110px)', overflowY: 'scroll'}}>
                <div style={{
                    "position": "relative",
                    "height": "29px",
                    "width": "inherit",
                    "margin": "20px 30px 0px",
                    "boxSizing": "border-box",
                    "textAlign": "center",
                    "display": "flex",
                    "flexDirection": "row",
                    "alignContent": "center",
                    "justifyContent": "center",
                    "alignItems": "center"
                    }}
                >
                    <div>
                        <span style={{margin: '0', fontSize: '24px', display: 'inline-block', width: 'max-content', height: 'inherit', fontWeight: 'bold', color: '#48C28B', textAlign: 'center', paddingTop: '5px'}}>
                            Payment confirmed
                        </span>
                    </div>
                    <div>
                        <svg id="Group_230" data-name="Group 230" xmlns="http://www.w3.org/2000/svg" width="31.761" height="30.38" viewBox="0 0 31.761 30.38">
                            <path id="Polygon_2" data-name="Polygon 2" d="M17.534,3.324A2.314,2.314,0,0,1,21.476,4.6l0,.028a2.314,2.314,0,0,0,2.67,1.94l.019,0a2.314,2.314,0,0,1,2.438,3.344l-.03.058A2.314,2.314,0,0,0,27.594,13.1l.054.027a2.314,2.314,0,0,1,0,4.135l-.054.027a2.314,2.314,0,0,0-1.017,3.129l.03.058a2.314,2.314,0,0,1-2.438,3.344l-.019,0a2.314,2.314,0,0,0-2.67,1.94l0,.028a2.314,2.314,0,0,1-3.942,1.276h0a2.314,2.314,0,0,0-3.307,0h0a2.314,2.314,0,0,1-3.942-1.276l0-.028a2.314,2.314,0,0,0-2.67-1.94l-.019,0a2.314,2.314,0,0,1-2.438-3.344l.03-.058a2.314,2.314,0,0,0-1.017-3.129l-.054-.027a2.314,2.314,0,0,1,0-4.135l.054-.027A2.314,2.314,0,0,0,5.183,9.966l-.03-.058A2.314,2.314,0,0,1,7.591,6.565l.019,0a2.314,2.314,0,0,0,2.67-1.94l0-.028a2.314,2.314,0,0,1,3.942-1.276h0a2.314,2.314,0,0,0,3.307,0Z" transform="translate(0)" fill="#48c28b"/>
                            <path id="Icon_material-done" data-name="Icon material-done" d="M9.1,15.964l-3-3-1,1,4,4L17.66,9.4l-1-1Z" transform="translate(4.846 2.009)" fill="#f7f7f7"/>
                        </svg>
                    </div>
                </div>
                <CampaignCard
                    product_image = {product_image}
                    campaignName = {name}
                    smallDescription = {smallDescription}
                    total_selling_price = {totalSellingPrice}
                    total_original_price = {totalOriginalPrice}
                />
                <div style={{margin: "20px 30px 0px", backgroundColor: '#D7EDFC', height: 'auto'}}>
                    <div style={{
                            "height": "115px",
                            "backgroundColor": "rgb(215, 237, 252)",
                            "display": "flex",
                             "padding": '5px 12px',
                            "flexDirection": "row",
                            "flexWrap": "nowrap",
                            "alignContent": "center",
                            "justifyContent": "center",
                            "alignItems": "center"
                            }}>
                        <div style={{
                            "display": "flex",
                            "width": "calc(100% - 90px)",
                            "color": "rgb(77, 77, 77)",
                            "height": "100%",
                            "flexDirection": "column",
                            "flexWrap": "nowrap",
                            "justifyContent": "center",
                            "alignItems": "flex-start"
                        }}>
                            <p style={{fontSize: '20px', margin: '0', fontWeight:'bold'}}>Share with your friends</p>
                            <p style={{fontSize: '12px', margin: '0'}}>who will be interested and help complete the campaign</p>
                        </div>
                        <div style={{display:'inline-block', width: '90px'}}>
                            <div style={{width: '100px', textAlign: 'center'}}>
                                <img src={WhatsappIcon}/>
                            </div>
                            <div style={{width: '100px', textAlign: 'center'}}>
                                <img style={{display:'inline-block'}} src={InstagramIcon}/>
                                <img style={{display:'inline-block'}}src={FacebookIcon}/>
                            </div>
                        </div>
                    </div>
                    <div style={{
                        "height": "40px",
                        "backgroundColor": "#3785B8",
                        "display": "flex",
                        "flexDirection": "row",
                        "alignContent": "center",
                        "justifyContent": "center",
                        "alignItems": "center",
                        "color": '#ffffff',
                        "fontSize": '14px',
                        "fontWeight": 'bold'}}
                    >
                        <img src={ShareIcon}/>
                        <span style={{
                            
                            "paddingLeft": '2px'
                            }}>Share now
                        </span>
                    </div>
                </div>
                <div style={{position: 'relative', height: '119px', width: 'inherit', margin: '20px 30px 0', padding: '11px', backgroundColor: '#E6E6E6', boxSizing:'border-box', borderRadius: '4px'}}>
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
                <div style={{position: 'relative', height: 'auto', width: 'inherit', margin: '20px 30px 0', padding: '11px', backgroundColor: '#F7F7F7', boxSizing:'border-box', borderRadius: '8px'}}>
                    <div style={{
                        "paddingBottom": "10px",
                        "display": "flex",
                        "flexDirection": "row",
                        "flexWrap": "nowrap",
                        "alignContent": "center",
                        "justifyContent": "space-between",
                        "alignItems": "center"
                    }}>
                        <p style={{margin: '0', color: '#999999', fontSize: '14px', fontWeight: 'bold'}}>To be delivered by</p>
                        <p style={{margin: '0', color: '#4D4D4D', fontSize: '14px', fontWeight: 'bold'}}>{getReadableDate()}</p>
                    </div>
                    <div>
                        <p style={{margin: '0', color: '#999999', fontSize: '14px', fontWeight: 'bold'}}>Delivery to</p>
                        <p style={{margin: '0', color: '#4D4D4D', fontSize: '14px', fontWeight: 'bold', padding: '5px 5px 0'}}>
                            {getAddress() || 'F1234, VV Grand Regency, Abbaiya Reddy Layout, CV Raman Nagar, Bangalore'}
                        </p>
                    </div>
                </div>
            </div>
            <div onClick={onNextClick}
                style={{position: 'absolute', height: '40px', width: '100%',
                bottom: '10px',  boxSizing:'border-box',
                backgroundColor:'#FFFFFF',
                margin: '10px 30px 0', boxSizing:'border-box', borderRadius: '5px', 
                textAlign: 'center', color: '#3785B8', fontSize: '20px', 
                fontWeight: 'bold', paddingTop: '14px', textDecoration: 'underline'}}>
                Back to Campaign Listing
            </div>
        </>
    );
}

export default PaymentConfirmed;