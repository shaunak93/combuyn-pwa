import axios from "axios";
import {baseUrl} from '../constants/api';
axios.defaults.headers.common['Content-Type'] = 'application/json'



// const createOrder = (order, callback) => {
//     console.log(order);
//     let access_token =  myStorage.getItem('access_token');
//     let url = baseUrl + '/orders/create-order/';
//     let postBody = {
//        ...order
//     };
//     let apiOptions = {
//         headers: {
//             Authorization: `Bearer ${access_token}`
//         }
//     };
//     axios.post(url,postBody, apiOptions)
//     .then((res)=>{
//         let data = res.data;
//         if(data.status === 'success'){
//             callback(null, data.data)
//         }else{
//             callback('Unable to create order. Please try again')
//         }
//     })
//     .catch((error)=>{
//         callback('Unable to create order. Please try again')
//     })
// }

const getOrderList = (accessToken, callback) => {

    let access_token =  accessToken;
    let url = baseUrl +  'v1/orders'
    let apiOptions = {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    };
    axios.get(url, apiOptions)
    .then((res)=>{
        if(res?.data){
            callback(null, res.data || [])
        }else{
            callback('Unable to get order list.')
        }
    })
    .catch((error)=>{
        callback('Unable to get order list.')
    })
} 

export {getOrderList}