import {USER_LOGIN_STATUSES} from '../constants/authentication';

const submitOTPRequest = () => {
    return new Promise((res, rej)=>{
        res('success');
        //rej(generateError('Unable to generate OTP'))
    })
}

const loginUser = (username, otp) => {
    return new Promise((res, rej) => {
        res(USER_LOGIN_STATUSES.LOGGED_IN);
    })
}


export {submitOTPRequest, loginUser};