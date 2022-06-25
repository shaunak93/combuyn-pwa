import React from 'react';

function CartTotal(props) {
    return (
        <div style={{position: 'relative', height: '29px', width: 'inherit', margin: '20px 30px 0', boxSizing:'border-box', textAlign: 'center'}}>
            <span style={{fontSize: '24px', display: 'inline-block', width: 'max-content', height: 'inherit', fontWeight: 'bold', color: '#3785B8', textAlign: 'center', paddingTop: '5px'}}>
                Your total is
            </span>
            <span style={{fontSize: '24px', display: 'inline-block',width: 'max-content', height: 'inherit', fontWeight: 'bold', color: '#4D4D4D', textAlign: 'center', paddingTop: '5px'}}>
                &nbsp;&#8377; 0000
            </span>
        </div>
    );
}

export default CartTotal;