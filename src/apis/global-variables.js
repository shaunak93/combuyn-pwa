import axios from "axios";
import {baseUrl} from '../constants/api';

axios.defaults.headers.common['Content-Type'] = 'application/json'
let myStorage = window.localStorage;;

const getGlobalVariables = () => {
    let url = baseUrl + '/interface/main/global-variables/';
    let apiOptions = {};
    axios.get(url,apiOptions)
    .then((res)=>{
        let data = res.data && res.data.data;
        console.log(data);
        let {master_category, master_subcategory, master_country, campaign_types, order_status, product_attributes, address_types} = data
        myStorage.setItem('master_category', JSON.stringify(master_category))
        myStorage.setItem('master_subcategory',  JSON.stringify(master_subcategory))
        myStorage.setItem('master_country',  JSON.stringify(master_country))
        myStorage.setItem('campaign_types',  JSON.stringify(campaign_types))
        myStorage.setItem('order_status',  JSON.stringify(order_status))
        myStorage.setItem('product_attributes',  JSON.stringify(product_attributes))
        myStorage.setItem('address_types',  JSON.stringify(address_types))
    })
    .catch((err)=>{
        console.log(err)
        console.log('Unable to fetch global-variables.')
    })
}

export {getGlobalVariables}