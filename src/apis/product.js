import axios from "axios";
import {baseUrl} from '../constants/api';

axios.defaults.headers.common['Content-Type'] = 'application/json'
let myStorage = window.localStorage;;

const getCampaignProductDetails = (id, callback) => {
    let access_token = myStorage.getItem('access_token')
    let url = `${baseUrl}/product/public/list-campaign-product/${id}/`;
    let apiOptions = {
        // headers: {
        //     Authorization: `Bearer ${access_token}`
        // }
    };
    axios.get(url,apiOptions)
    .then((res)=>{

        let data = (res.data && res.data.data )|| {};
        let {campaign, product} = data
        callback(null, {campaign, product});
    })
    .catch((err)=>{
        console.log(err)
        callback('Unable to fetch campaign details.')
    })
}

export {getCampaignProductDetails}