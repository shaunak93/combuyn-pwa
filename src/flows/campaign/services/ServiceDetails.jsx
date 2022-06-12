import React, { useState } from 'react';
import Button from '@mui/material/Button'
import CampaignNavHeader from '../common/CampaignNavHeader';
import Article from '../../../components/Article';
import LocationPanel from '../../../components/LocationPanel';
import SelectorGroup from '../../../components/selectors/SelectorGroup';
import ServiceCard from './common/ServiceCard';

import {getFulfilledPecentage, getCountdownTimeString, checkOrder} from './utils';


function ServiceDetails(props) {
    let {
        campaignDetails = {}, productDetails = {}, 
        totalSellingPrice, totalOriginalPrice,
        order, selectorsMeta, currentCoordinates ,setCurrentCoordinates,
        setOrder, onBackClick, onNextClick
    } = props;
    let currentTime = new Date().getTime();
    let {
        name, is_active, 
        end_datetime, smallDescription,
        total_order_count, current_order_count,
    } = campaignDetails;
    let {
        id, description, product_image
    } = productDetails

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

    return (
        <>
            <CampaignNavHeader onBackClick={onBackClick}/>
            
            <div style={{height: 'calc(100% - 165px)', overflowY: 'scroll'}}>
                <ServiceCard
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
                <div style={{position: 'relative', height: 'auto', width: 'inherit', margin: '20px 30px 0', boxSizing:'border-box'}}>
                    <Article 
                        label="Description" 
                        details={description}
                    />
                </div>
            
            </div>
           
            <div style={{position: 'relative', height: '114px', width: 'inherit',backgroundColor: '#F7F7F7',  boxSizing:'border-box', boxShadow: '0px -1px 5px #d2d1d1'}}>
                <LocationPanel style={{padding: '10px 36px 5px !important'}} currentCoordinates={currentCoordinates} setCurrentCoordinates={setCurrentCoordinates}/>
                <div style={{height: '48px', margin:'10px 30px'}}>
                    <Button variant="text" style={{boxSizing: 'border-box',marginRight: '4px',backgroundColor:'#3785B8', color: '#ffffff', fontSize:'20px', fontWeight: 'bold', height: '48px', width: 'calc(50% - 4px)'}}>Share</Button>
                    <Button onClick={onAddToCart} variant="text" style={{backgroundColor:'#FFA64D', color: '#ffffff', fontSize:'20px', fontWeight: 'bold',  height: '48px', width: '50%'}}>Add to cart</Button>
                </div>
            </div>

            
            
        </>
    );
}

export default ServiceDetails;