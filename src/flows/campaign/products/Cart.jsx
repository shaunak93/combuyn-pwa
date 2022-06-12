import React, {useState} from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';

import AddItemButtonWithPopup from '../../../components/popups/AddItemButtonWithPopup'
import CampaignNavHeader from '../common/CampaignNavHeader';
import CampaignCard from './common/CampaignCard';
import AddressForm from '../../../components/forms/AddressForm';

import { showToast, getOrderQuantity } from '../../../utils/general';
import {getFulfilledPecentage, getCountdownTimeString, getSelectorsMeta, checkOrder, calculateCartPricing} from './utils';

const Item = ({itemName, itemMeta, onDelete, addQuantity, substractQuantity, disableDelete}) => {
    let attributes = Object.entries(itemMeta).reduce((list, [key, value])=>{
        if(key != 'product_id' && key != 'quantity') {
            let capitalizedAttribute =  (value && value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()) || '';
            list.push(capitalizedAttribute)
        };
        return list;
    }, [])
    return (<div style={{position: 'relative', height: '49px',  marginBottom: '15px',boxSizing:'border-box', borderRadius: '8px', backgroundColor:'#F7F7F7', padding: '10px 13px'}}>
        <div style={{display: 'inline-block'}}>
            <p style={{fontSize: '14px', fontWeight: 'bold', color: '#3785B8', margin: '0'}}>{itemName}</p>
            <p style={{fontSize: '10px', fontWeight: 'bold', color: '#999999', margin: '0'}}>{(attributes && attributes.join(',')) || ''}</p>
        </div>
        <div style={{display: 'inline-block', width: 'max-content', float: 'right', paddingTop: '3px'}}>
            <div onClick={()=>{substractQuantity()}} style={{display: 'inline-block', width: '20px', height: '20px', borderRadius: '4px', backgroundColor: '#3785B8' }}><RemoveIcon style={{fontSize: '18px', fontWeight: 'bold',color: '#FFFFFF', paddingLeft: '1px', paddingTop: '1px'}}/></div>
            <span style={{display: 'inline-block', width:'26px', fontSize: '14px', textAlign: 'center', margin: '2px 4px 0px', verticalAlign: 'top'}}>{itemMeta.quantity}</span>
            <div onClick={()=>{addQuantity()}} style={{display: 'inline-block', width: '20px', height: '20px', borderRadius: '4px', backgroundColor: '#3785B8' }}><AddIcon style={{fontSize: '18px', fontWeight: 'bold',color: '#FFFFFF', paddingLeft: '1px', paddingTop: '1px'}}/></div>
            <div onClick={() => {onDelete()}} style={{display: 'inline-block', width: '20px', height: '20px', borderRadius: '4px', backgroundColor: disableDelete?'#cccccc':'#FFA64D', marginLeft: '2px' }}><DeleteIcon style={{fontSize: '18px',fontWeight: 'bold', color: '#FFFFFF', paddingLeft: '1px', paddingTop: '1px'}}/></div>
        </div>
    </div>)
}

const ItemList = ({order, setOrder, selectorsMeta, productName}) => {
    let productMeta = order.product_meta;
    const onDelete = (idx) => {
        let newOrder = JSON.parse(JSON.stringify(order))
        let newProductMeta = newOrder.product_meta.filter((obj, index) => index !== idx );
        if(newProductMeta.length < 0) return;
        newOrder.product_meta = newProductMeta;
        newOrder.quantity = getOrderQuantity(newOrder);
        setOrder(newOrder);
    }
    const onQuantityUpdate = (idx, updateQuantity) => {
        let newOrder = JSON.parse(JSON.stringify(order))
        let newProductMeta = newOrder.product_meta;
        newProductMeta[idx].quantity = newProductMeta[idx].quantity + updateQuantity;
        newOrder.product_meta = newProductMeta;
        newOrder.quantity = getOrderQuantity(newOrder);
        setOrder(newOrder);
    }
    const addQuantity = (idx) => {
        onQuantityUpdate(idx, 1);
    }
    const substractQuantity = (idx) => {
        onQuantityUpdate(idx, -1);
    }

    return (<>
        {productMeta.map((item, idx) => {
            return <Item
                key={'item_'+idx}
                itemName={productName}
                itemMeta={item}
                onDelete={() => onDelete(idx)}
                addQuantity={() => addQuantity(idx)}
                substractQuantity={() => substractQuantity(idx)}
                disableDelete={productMeta.length <= 1}
            />
        })}
    </>) 
}

const checkAddress = (address) => {
    if(!address || !address.selectAddresListId){
        return 'Please select socity.'
    }

    if(!address.line1){
        return 'Please enter flat no / room no.'
    }

    return null;
}




function Cart(props) {

    let {campaignDetails = {}, productDetails = {}, selectorsMeta={}, order, totalSellingPrice, totalOriginalPrice,optionalData, setOrder, setOptionalData, onBackClick, onNextClick} = props;
    let {
        name, link, is_active, start_datetime, end_datetime, image,
        smallDescription, original_price, selling_price, min_order_count, max_order_count,
        total_order_count, current_order_count, features
    } = campaignDetails;
    let {
        id, description, product_meta, product_image
    } = productDetails
    let productName = productDetails.name || '';

    const [addressDetails, setAddressDetails] = useState(null)

    const onContinueClick = () => {
        let error = checkOrder({order, selectorsMeta});
        if(error){
            showToast({type: 'info', message: error})
            return;
        }
        error = checkAddress(addressDetails);
        if(error){
            showToast({type: 'info', message: error})
            return;
        }
        console.log(addressDetails);
        setOptionalData({address: addressDetails});
        onNextClick();
    }

    return (
        <>
            <CampaignNavHeader
                onBackClick={onBackClick}
            />
            <div style={{position: 'relative', height: '27px', width: 'calc(100% - 60px)', margin: '20px 30px 0', boxSizing:'border-box', borderRadius: '13px', backgroundColor: '#F7F7F7'}}>
                <div style={{display: 'inline-block', position: 'relative', height: 'inherit', width: '33%', backgroundColor: '#FFA64D', borderRadius: '13px'}}>
                    <span style={{display: 'inline-block', fontSize: '12px', width: '100%', fontWeight: 'bold', color:'#ffffff', textAlign: 'center', paddingTop: '5px' }}>Cart</span>
                </div>
                <span style={{fontSize: '12px', display: 'inline-block', width: '33%', height: 'inherit', fontWeight: 'bold', color: '#3785B8', textAlign: 'center', paddingTop: '5px'}}>Order summery</span>
                <span style={{fontSize: '12px', display: 'inline-block',width: '33%', height: 'inherit', fontWeight: 'bold', color: '#3785B8', textAlign: 'center', paddingTop: '5px'}}>Payment</span>
            </div>
            <div style={{position: 'relative', height: '29px', width: 'calc(100% - 60px)', margin: '20px 30px 0', boxSizing:'border-box', textAlign: 'center'}}>
                <span style={{fontSize: '24px', display: 'inline-block', width: 'max-content', height: 'inherit', fontWeight: 'bold', color: '#3785B8', textAlign: 'center', paddingTop: '5px'}}>
                    Your total is
                </span>
                <span style={{fontSize: '24px', display: 'inline-block',width: 'max-content', height: 'inherit', fontWeight: 'bold', color: '#4D4D4D', textAlign: 'center', paddingTop: '5px'}}>
                    &nbsp;&#8377; {totalSellingPrice || '0000'}
                </span>
            </div>
            <div style={{position: 'relative', boxSizing:'border-box'}}>
                <CampaignCard
                    product_image = {product_image}
                    campaignName = {name}
                    smallDescription = {smallDescription}
                    total_selling_price = {totalSellingPrice}
                    total_original_price = {totalOriginalPrice}
                />
            </div>
            <div style={{height: 'calc(100% - 450px)', width: 'calc(100% - 60px)',margin: '20px 30px 0', boxSizing:'border-box', overflowY: 'scroll'}}>
                <ItemList
                    order={order}
                    setOrder={setOrder}
                    selectorsMeta={selectorsMeta}
                    productName={productName}
                />
                <AddItemButtonWithPopup
                    product_id={id}
                    productImages={product_image}
                    order={order}
                    setOrder={setOrder}
                    selectorsMeta={selectorsMeta}
                    maxQuantity={max_order_count}
                    minQuantity={min_order_count}
                />
                <AddressForm 
                    campaignDetails={campaignDetails}
                    editAddressDetails={setAddressDetails}
                    addressDetails={addressDetails}
                />
             </div>

            

            <div onClick={onContinueClick} style={{height: '48px', width: 'calc(100% - 60px)',margin: '20px 30px 0', boxSizing:'border-box', backgroundColor:'#FFA64D',width: 'calc(100% - 60px)',margin: '10px 30px 0', boxSizing:'border-box', borderRadius: '5px', textAlign: 'center', color: '#ffffff', fontSize: '20px', fontWeight: 'bold', paddingTop: '10px'}}>
                Continue
            </div>
        </>
    );
}

export default Cart;