import React, {useState} from 'react';
import HeaderBar from '../base/HeaderBar';



function Campaign(props) {
    //let {campaignDetails} = props;
    let campaignDetails = {
        imageUrl: '',
        productName: 'Product Name',
        productShortDesc: 'Product short description',
        price: '500',
        mrp: '1000',
    }
    let {state, setState} = useState('home');
    let {order, setOrder} = useState({});

    return (
        <>
            <HeaderBar/>
            <Page/>
        </>
    );
}

export default Campaign;