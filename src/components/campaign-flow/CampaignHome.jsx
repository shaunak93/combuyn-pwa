import React, { useState } from 'react';
import CampaignModalHeader from '../headers/CampaignModalHeader';
import ImageSlider from '../ImageSlider';
import ColorSelector from '../selectors/ColorSelector';
import SizeSelector from '../selectors/SizeSelector';
import ShapeSelector from '../selectors/ShapeSelector';
import Article from '../Article';
import LocationPanel from '../LocationPanel';
import Button from '@mui/material/Button'
import SelectorGroup from '../selectors/SelectorGroup';
import CampaignCard from './components/CampaignCard';

import {getFulfilledPecentage, getCountdownTimeString, getSelectorsMeta, checkOrder, calculateCartPricing} from './utils';


function CampaignHome(props) {
    let {campaignDetails = {}, productDetails = {}, totalSellingPrice, totalOriginalPrice, order, selectorsMeta, setOrder, onBackClick, onNextClick} = props;
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
    //let selectorsMeta = getSelectorsMeta(productDetails); 
    
    
    const onSelectorUpdate = (index, key, value) => {
        let metadata = order.product_meta;
        if(!metadata.length) metadata.push({product: id})
        metadata[index][key] = value;
        setOrder({
            ...order,
            product_meta: metadata
        })
    }

    const onAddToCart = (e) => {
        let orderError = checkOrder({order, selectorsMeta});
        console.log(orderError);
        if(!orderError){
            onNextClick()
        }
        
    }

    //let  {total_selling_price, total_original_price} = calculateCartPricing({selectorsMeta, order, original_price, selling_price});



    return (
        <>
            <CampaignModalHeader onBackClick={onBackClick}/>
            <div style={{height: 'calc(100% - 165px)', overflowY: 'scroll'}}>
                
                <CampaignCard
                    product_image = {product_image}
                    campaignName = {name}
                    smallDescription = {smallDescription}
                    total_selling_price = {totalSellingPrice}
                    total_original_price = {totalOriginalPrice}
                />
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
                <div style={{position: 'relative', height: 'auto', width: 'inherit', margin: '20px 30px 0', boxSizing:'border-box'}}>
                    {!!selectorsMeta && 
                        <SelectorGroup
                            selectorsMeta={selectorsMeta}
                            orderProductMeta={order.product_meta[0] || []}
                            onChange={(key, val) => {onSelectorUpdate(0, key, val)}}
                        />
                    }
                    
                </div>
                {/*<div style={{position: 'relative', height: '60px', width: 'inherit', margin: '20px 30px 0', boxSizing:'border-box'}}>
                    <span style={{ display: 'inline-block', paddingTop: '8px', color: '#4D4D4D', fontSize: '16px', fontWeight: 'bold', width: '114px'}}>Who brought</span>

                    <div style={{display: 'inline-block', float: 'right', width:'calc(100% - 120px)', height: '40px', textAlign: 'right'}}>
                        {['JD', 'SA', 'PT'].map((initials)=> getUserInitialsCircle(initials) )}
                    </div>
                </div>*/}
                <div style={{position: 'relative', height: 'auto', width: 'inherit', margin: '20px 30px 0', boxSizing:'border-box'}}>
                    <Article 
                        label="Description" 
                        details={description}
                    />
                    {/** 
                     * <Article 
                        label="Description" 
                        details="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea"
                    />
                    */}
                </div>
            
            </div>
           
            <div style={{position: 'relative', height: '114px', width: 'inherit',backgroundColor: '#F7F7F7',  boxSizing:'border-box', boxShadow: '0px -1px 5px #d2d1d1'}}>
                <LocationPanel style={{padding: '10px 36px 5px !important'}}/>
                <div style={{height: '48px', margin:'10px 30px'}}>
                    <Button variant="text" style={{boxSizing: 'border-box',marginRight: '4px',backgroundColor:'#3785B8', color: '#ffffff', fontSize:'20px', fontWeight: 'bold', height: '48px', width: 'calc(50% - 4px)'}}>Share</Button>
                    <Button onClick={onAddToCart} variant="text" style={{backgroundColor:'#FFA64D', color: '#ffffff', fontSize:'20px', fontWeight: 'bold',  height: '48px', width: '50%'}}>Add to cart</Button>
                </div>
            </div>

            
            
        </>
    );
}

const getUserInitialsCircle = (initials) => {
    let color = '016FB8'// || getRandomColor();
    let invertedColor = 'ffffff'// || invertHex(color);
    return <div style={{display: 'inline-block', marginLeft: '5px',height: '20px', width: '20px',fontWeight: '500'  ,padding: '10px', borderRadius: '20px', backgroundColor: ('#'+color), color: ('#'+invertedColor)}}>{initials}</div>
}

//position: 'relative', height: '27px', width: 'inherit', margin: '20px 30px 0', boxSizing:'border-box', borderRadius: '13px', backgroundColor: '#F7F7F7'

export default CampaignHome;