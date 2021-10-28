import { Email } from "@material-ui/icons";
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

export {createOTP, validateOTP, createBuyer, addUserAddress};