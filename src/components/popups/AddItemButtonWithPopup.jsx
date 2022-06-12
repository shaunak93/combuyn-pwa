import React, {useState} from 'react';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal';

import ColorSelector from '../selectors/ColorSelector';
import SelectorGroup from '../selectors/SelectorGroup';
import QuantitySelector from '../selectors/QuantitySelector';

import {checkOrder } from '../../flows/campaign/products/utils';
import { getOrderQuantity} from '../../utils/general';

function AddItemButtonWithPopup(props) {
    const {product_id, productImages, selectorsMeta, setOrder, order, maxQuantity = 10, minQuantity = 1} = props;
    const [productMeta, setProductMeta] = useState({
        product_id: product_id,
        quantity: minQuantity
    })
    const [isOpen, setIsOpen] = useState(false);
    const onChange = (key, value) => {
        setProductMeta({
            ...productMeta,
            [key]: value
        })
    }
    const onProceed = () => {
        let error = checkOrder({order: {product_meta: [productMeta]} ,selectorsMeta});
        if(error){

        }
        else{
            let newOrder = JSON.parse(JSON.stringify(order));
            newOrder.product_meta.push(productMeta);
            newOrder.quantity = getOrderQuantity(newOrder);
            setOrder(newOrder);
            setIsOpen(false);
        }
    }

    const OnCancel = () => {
        setIsOpen(false)
    }

    return (
        <>
            <div onClick={() => {setIsOpen(true)}} style={{
                    width: 'max-content', height:'25px', backgroundColor: '#FFA64D', margin: '10px 0 20px', boxSizing: 'border-box',
                    borderRadius: '13px', fontSize: '12px', fontWeight: 'bold', color:'#F7F7F7', padding: '2px 2px 2px 7px'}}
                >
                    <span style={{display: 'inline-block', verticalAlign:'top', marginTop: '3px'}}>Add new items</span>
                    <span style={{display: 'inline-block', width: '20px', height: '20px', borderRadius: '10px', backgroundColor: '#F7F7F7', marginLeft: '2px' }}>
                        <AddIcon style={{fontSize: '18px',fontWeight: 'bold', color: '#FFA64D', paddingLeft: '1px', paddingTop: '1px'}}/>
                    </span>
            </div>
            <Modal
                style={{width: 'inherit'}}
                open={isOpen}
                onClose={() => {setIsOpen(false)}}
                aria-labelledby="modal-add-item-title"
                aria-describedby="modal-add-ite-description"
            >
                    <div style={{boxSizing: 'border-box',width: 'calc(100% - 60px)', height: 'auto', margin: '120px auto 0', padding: '20px 12px 13px', backgroundColor:'#F7F7F7', borderRadius: '8px'}}>
                    <div style={{display: 'inline-block', height: 'inherit', width: '100%', textAlign: 'center', verticalAlign: 'top'}}>
                        <img style={{height: 'auto', width: 'auto', maxHeight: '100%', maxWidth: '100%', borderRadius: '4px'}} src={productImages && productImages[0]}/>
                    </div>
                    <SelectorGroup
                        selectorsMeta={selectorsMeta}
                        orderProductMeta={productMeta}
                        onChange={onChange}
                    />
                    <QuantitySelector 
                        maxQuantity={maxQuantity}
                        minQuantity={minQuantity}
                        quantity={productMeta.quantity}
                        onQuantityUpdate={(val) => {onChange('quantity',val)}}
                    />
                    <div style={{marginTop: '10px'}}>
                        <div onClick={onProceed} style={{display: 'inline-block', height: '39px', width: '50%', boxSizing:'border-box', backgroundColor:'#FFA64D',boxSizing:'border-box', borderRadius: '5px', textAlign: 'center', color: '#ffffff', fontSize: '14px', fontWeight: 'bold', paddingTop: '10px'}}>
                            Proceed
                        </div>
                        <div onClick={OnCancel} style={{display: 'inline-block',height: '39px', width: '50%', boxSizing:'border-box', backgroundColor:'#F7F7F7', boxSizing:'border-box', borderRadius: '5px', textAlign: 'center', color: '#4D4D4D', fontSize: '12px', fontWeight: 'bold', paddingTop: '10px', textDecoration: 'underline' }}>
                            Cancel
                        </div>
                    </div>
                </div>  
            </Modal>
        </>
    );
}

export default AddItemButtonWithPopup;