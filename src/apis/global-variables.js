import axios from "axios";
import {baseUrl} from '../constants/api';

axios.defaults.headers.common['Content-Type'] = 'application/json'
let myStorage = window.localStorage;;

const getGlobalVariables = () => {
    let url = baseUrl + '/interface/main/global-variables/';
    let apiOptions = {};
    axios.get(url,apiOptions)
    .then((res)=>{
        let data = res.data;
        let {master_category, master_subcategory, master_country, campaign_types, order_statuses, product_attributes, address_types} = data
        myStorage.setItem('master_category', master_category)
        myStorage.setItem('master_subcategory', master_subcategory)
        myStorage.setItem('master_country', master_country)
        myStorage.setItem('campaign_types', campaign_types)
        myStorage.setItem('order_statuses', order_statuses)
        myStorage.setItem('product_attributes', product_attributes)
        myStorage.setItem('address_types', address_types)
    })
    .catch((err)=>{
        console.log(err)
        console.log('Unable to fetch global-variables.')
    })
}

export {getGlobalVariables}