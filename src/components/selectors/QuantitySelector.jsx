import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';

function QuantitySelector(props) {
    const {maxQuantity, minQuantity, quantity, onQuantityUpdate} = props
    const addQuantity = () => {
        if(quantity + 1 <= maxQuantity){
            onQuantityUpdate && onQuantityUpdate(quantity + 1);
        }
    }
    const removeQuantity = () => {
        if(quantity - 1 >= minQuantity){
            onQuantityUpdate && onQuantityUpdate(quantity - 1);
        }
    }

    return (
        <div style={{display: 'inline-block', height: 'inherit', width: '100%', textAlign: 'left', verticalAlign: 'top'}}>
            <div style={{display: 'inline-block'}}>
                <p style={{fontSize: '12px', fontWeight: 'bold', color: '#4D4D4D', margin: '0'}}>Number of pcs</p>
            </div>
            <div style={{display: 'inline-block', width: 'max-content', float: 'right', paddingTop: '3px'}}>
                <div onClick={()=>{removeQuantity()}} style={{display: 'inline-block', width: '20px', height: '20px', borderRadius: '4px', backgroundColor: '#3785B8' }}><RemoveIcon style={{fontSize: '18px', fontWeight: 'bold',color: '#FFFFFF', paddingLeft: '1px', paddingTop: '1px'}}/></div>
                <span style={{display: 'inline-block', width:'26px', fontSize: '14px', textAlign: 'center', margin: '2px 9px 0px', verticalAlign: 'top'}}>{quantity}</span>
                <div onClick={()=>{addQuantity()}} style={{display: 'inline-block', width: '20px', height: '20px', borderRadius: '4px', backgroundColor: '#3785B8' }}><AddIcon style={{fontSize: '18px', fontWeight: 'bold',color: '#FFFFFF', paddingLeft: '1px', paddingTop: '1px'}}/></div>
            </div>
        </div>
    );
}

export default QuantitySelector;