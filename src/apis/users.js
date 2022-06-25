import axios from "axios";
import {baseUrl} from '../constants/api';

let myStorage = window.localStorage;

axios.defaults.headers.common['Content-Type'] = 'application/json'

const createOTP = ({countryCode, mobileNumber}, callback) => {
    let url = baseUrl + '/users/create-otp/'
    let postBody = {
        "mobile": mobileNumber,
        "country": countryCode
    }
    axios.post(url,postBody)
    .then((res)=>{
        let data = res.data;
        if(data.status_code === 200){
            let response =  {
                generatedUsername: data && data.data && data.data.username,
                buyer_id: data && data.data && data.data.buyer
            }
            callback(null, response)
        }
        else{
            callback('Unable to generate OTP. Please try again.')
        }
        
    })
    .catch((error)=>{
        console.log(error)
        callback('Unable to generate OTP. Please try again.')
    })
}

const validateOTP = ({username, otp}, callback) => {
    let url = baseUrl + '/users/validate-otp/'
    let postBody = {
        "username": username,
        "otp": otp
    }
    axios.post(url,postBody)
    .then((res)=>{
        let data = res.data;
        console.log('validateOTP', data);
        if(data.status === 'success'){
            callback( null, data.data)
        }
        else if(data.status === 'failure'){
            callback('Invalid OTP.')
        }
        else{
            callback('Unable to validate OTP. Please try again.')
        }
        
    })
    .catch((error)=>{
        console.log(error.response)
        if(!error.response || !error.response.data || !error.response.data.status){
            callback('Unable to validate OTP. Please try again.')
        }else{
            if(error.response.data.status === 'failure'){
                callback('Invalid OTP.')
            }
            else{
                callback('Unable to validate OTP. Please try again.')
            }
        }
        
    })
}

const createBuyer = ({email, name, access}, callback) => {
    let access_token = access || myStorage.getItem('access_token');
    let url = baseUrl + '/users/buyer/create/'
    let postBody = {
        email, name,
        first_name: '',
        last_name: ''
    };
    let apiOptions = {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    };
    axios.post(url,postBody, apiOptions)
    .then((res)=>{
        let data = res.data;

        console.log('createBuyer', data);
        if(data && (data.status === 'success')){
            let {id, user} = data.data;
            callback( null, {buyer_id: id, user_id: user})
        }
        else{
            callback('Unable to create user.')
        }
        
    })
    .catch((error)=>{
        console.log(error.response)
        if(!error.response || !error.response.data || !error.response.data.status){
            callback('Unable to create user.')
        }else{
            if(error.response.data.status === 'failure'){
                callback('Unable to create user.')
            }
            else{
                callback('Unable to create user.')
            }
        }
        
    })
}

const addUserAddress = ({address, access}, callback) => {
    let access_token = access || myStorage.getItem('access_token');
    let url = baseUrl + '/users/address/';
    let postBody = {
       ...address,
       address_name: new Date().getTime(),
       full_address: '',
       user: myStorage.getItem('user_id')
    };
    let apiOptions = {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    };
    axios.post(url,postBody, apiOptions)
    .then((res)=>{
        let data = res.data;
        console.log('addUserAddress', data.id);
        callback( null, data.id)
        
    })
    .catch((error)=>{
        console.log(error.response)
        callback('Unable to add address.')
    })
} 

const checkAndRefreshAccessToken = () => {
    let accessToken = myStorage.getItem('access_token');
    let accessTTL = myStorage.getItem('access_ttl');
    let refreshToken =  myStorage.getItem('refresh_token');
    let currentTime = new Date().getTime(); 
    
    if(!accessToken) return;
    if(accessTTL < currentTime){
        let url = baseUrl + '/token/refresh/';
        let postBody = {
            refresh: refreshToken
        }
        let apiOptions = {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
        axios.post(url,postBody, apiOptions)
        .then((res)=>{
            let data = res.data;
            let {access} = data
            myStorage.getItem('access_token', access);
            myStorage.getItem('access_ttl', new Date().getTime() + 518400000); //keeping ttl of 6days
        })
        .catch((error)=>{
            myStorage.getItem('access_token', null);
            myStorage.getItem('access_ttl', null);
            myStorage.getItem('refresh_token', null);
        })
    }
}

const requestOTP = ({mobileNumber}, callback) => {
    let url = baseUrl + 'v1/auth/otp'
    let postBody = {
        "mobile": mobileNumber,
        "type": "login"
    }
    
    axios.post(url,postBody)
    .then((res)=>{
        let {data, status} = res;
        if(status === 200){
            callback(null, data)
        }
        else{
            callback('Unable to generate OTP. Please try again.')
        }
    })
    .catch((error)=>{
        console.log(error)
        callback('Unable to generate OTP. Please try again.')
    })
}

const loginWithOTP = ({mobileNumber, otp}, callback) => {
    let url = baseUrl + 'v1/auth/login'
    let postBody = {
        "mobile": mobileNumber,
        "otp": otp
    }
    axios.post(url,postBody)
    .then((res)=>{
        //let data = res;
        let {data, status} = res
        if(status === 200){
            let {token, user} = data || {};
            if(token || user){
                callback(null,  {token, user})
            }
        }
        else{
            callback('Unable to validate OTP. Please try again.')
        }
    })
    .catch((error)=>{
        callback('Unable to validate OTP. Please try again.')
    })
}


// {
//     "token": {
//         "tokenType": "Bearer",
//         "accessToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDc3NjkxNjIsImlhdCI6MTY0Nzc2ODI2Miwic3ViIjoiNjIwZjI2MjI0OTZiYTVmOGQ3NzZiOGRmIn0.COiAW0zJ5hlpQMSei4l0IX6lltdvlMRJQmoQIlxxAtc",
//         "refreshToken": "620f2622496ba5f8d776b8df.2f39ba9ee9688310291d6a1768017e48f12007ca80b363bc413612aef9512451a8bf180fe4f4318f",
//         "expiresIn": "2022-03-20T09:39:22.900Z"
//     },
//     "user": {
//         "id": "620f2622496ba5f8d776b8df",
//         "name": "Vineesh M P",
//         "email": "test@cbn.com",
//         "role": "user",
//         "createdAt": "2022-02-18T04:52:50.917Z",
//         "address": [
//             {
//                 "apartment": "Orion Plaza",
//                 "tower": "B",
//                 "flatNo": "201"
//             }
//         ],
//         "mobile": 9787878789
//     }
// }




export {createOTP, validateOTP, createBuyer, addUserAddress, checkAndRefreshAccessToken, requestOTP, loginWithOTP};