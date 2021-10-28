import {USER_LOGIN_STATUSES} from '../constants/authentication';
import { get } from 'idb-keyval';

const submitOTPRequest = () => {
    return new Promise((res, rej)=>{
        res('success');
        //rej(generateError('Unable to generate OTP'))
    })
}

const checkLoginStatus = (callback) => {
   get('access_token')
   .then((res)=>{
        callback(!!res)
   })
   .catch((err) => {
       callback(false)
   })
}

const loginUser = (username, otp) => {
    return new Promise((res, rej) => {
        res(USER_LOGIN_STATUSES.LOGGED_IN);
    })
}


export {submitOTPRequest, loginUser, checkLoginStatus};