import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import {showToast} from '../utils/general';

import {LOGIN_STEPS, USER_LOGIN_STATUSES} from '../constants/authentication';
import {submitOTPRequest, loginUser} from '../utils/authentication';

import LoaderOverlay from '../components/base/LoaderOverlay';
import {createOTP, validateOTP, createBuyer} from '../apis/users';
let myStorage = window.localStorage;
const {GET_OTP, ENTER_OTP} = LOGIN_STEPS;
const getButtonLabel = (state) => {
    let {GET_OTP, ENTER_OTP} = LOGIN_STEPS;
    switch (state) {
        case ENTER_OTP:
            return 'Login';
            break;
        case GET_OTP:
        default:
            return 'GET OTP';
            break;
    }
}


function validateEmail(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true)
  }
    return (false)
}

function LoginComponent(props) {
    let {callbackOnSuccess} = props;
    const history = useHistory();
    //let {prefilledUsername} = props;
    const [usernameDisable, setUsernameDisabled] = useState(false)
    const [generatedUsername, setGeneratedUsername] = useState('');
    const [username, setUsername] = useState('');
    const [otp, setOtp] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [currentStep, setCurrentStep] = useState(GET_OTP);
    const [buttonLabel, setButtonLabel] = useState(getButtonLabel(GET_OTP));
    const [isLoading, setIsLoading] = useState(false);
    const [isNewUser, setIsNewUser] = useState(false);

    const requestUserOTP = async () => {
        setIsLoading(true);
        createOTP({mobileNumber: username, countryCode: '+91'}, (err, {generatedUsername, buyer_id}) => {
            setIsLoading(false);
            if(err){
                showToast({
                    type:'error', 
                    message: err
                })
                return
            }
            else{
                setGeneratedUsername(generatedUsername);
                setCurrentStep(ENTER_OTP);
                setUsernameDisabled(true);
                setIsLoading(false);
                if(!buyer_id){
                    setIsNewUser(true);
                }

            }         
        })
    }

    const submitUserOTP = () => {
        setIsLoading(true);
        validateOTP({username: generatedUsername, otp: otp}, (err, res) => {
            setIsLoading(false);
            if(res){
                let {access, refresh, user } = res

                myStorage.setItem('access_token', access)
                myStorage.setItem('access_ttl', (new Date().getTime() + 518400000))
                myStorage.setItem('refresh_token', refresh)
                myStorage.setItem('user', user);
                myStorage.setItem('mobile', username);

                if(isNewUser){
                    createBuyer({email, name, access}, (err, res) => {  
                        if(err){
                            showToast({
                                type:'error', 
                                message: err
                            })
                        }
                        else{
                            myStorage.setItem('buyer_id', res.buyer_id);
                            myStorage.setItem('user_id', res.user_id);
                            myStorage.setItem('buyer', res.buyer);
                            myStorage.setItem('name', name);
                            myStorage.setItem('email', email);

                            handleSuccesfulLogin(access);
                        }
                    })
                }else{
                    let {user} = res;
                    myStorage.setItem('buyer_id', res.user.buyer.id);
                    myStorage.setItem('user_id', res.user.id);
                    myStorage.setItem('name', user.buyer.name);
                    myStorage.setItem('email', user.email);
                    handleSuccesfulLogin();
                }
                
            }
            else{
                console.log(err)
                showToast({
                    type:'error', 
                    message: err
                })
            }
        })
    }

    const handleSuccesfulLogin = () => {
        showToast({
            type:'success', 
            message: 'Login successful'
        })
        if(callbackOnSuccess){
            callbackOnSuccess()
        }
        else{
            history.push('/home');
        }
    }

    const validate = () => {
        if(currentStep === ENTER_OTP){
            if(isNewUser && !name) return 'Name number is required';
            if(isNewUser && !email) return 'Email number is required';
            if(isNewUser && !validateEmail(email)) return 'Please enter valid Email.';
            if(!otp) return 'OTP is required';
        }
        if(currentStep === GET_OTP){
            if(!username) return 'Mobile number is required';
        }
    }

    const onButtonClick = () => {
        let error = validate();
        if(error){
            showToast({type: 'error', message: error});
            return;
        }
        switch (currentStep) {
            case ENTER_OTP:
                submitUserOTP();
                break;
            case GET_OTP:
                requestUserOTP();
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        setButtonLabel(getButtonLabel(currentStep));
    }, [currentStep])
    
    return (<Paper
        elevation={3}
        style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '100px 30px 0',
            padding: '20px 30px'
        }}
        children={<>
            <LoaderOverlay show={isLoading}/>
            <Typography style={{width: 'calc(100% - 20px)'}} align="left" variant="h5" >
                Login
            </Typography>
            <TextField 
                id="outlined-basic" 
                className="mt-30" 
                label="Mobile Number" 
                variant="outlined" 
                size="small"
                InputProps={{
                    startAdornment: <InputAdornment position="start">+91</InputAdornment>,
                }}
                style={{width: 'calc(100% - 20px)'}}
                value={username}
                disabled={usernameDisable}
                onChange={(event) => {setUsername(event.target.value)}}
                type="number"
                required={true}
            />
            {currentStep === ENTER_OTP &&
                <>
                    {!!isNewUser && <>
                        <TextField 
                            id="outlined-basic" 
                            className="mt-10" 
                            label="Name" 
                            variant="outlined" 
                            size="small"
                            style={{width: 'calc(100% - 20px)'}}
                            value={name}
                            onChange={(event) => {setName(event.target.value)}}
                            required={true}
                        />
                        <TextField 
                            id="outlined-basic" 
                            className="mt-10" 
                            label="Email" 
                            variant="outlined" 
                            size="small"
                            style={{width: 'calc(100% - 20px)'}}
                            value={email}
                            onChange={(event) => {setEmail(event.target.value)}}
                            required={true}
                        />
                    </>}
                    <TextField 
                        id="outlined-basic" 
                        className="mt-10" 
                        label="OTP" 
                        variant="outlined" 
                        size="small"
                        style={{width: 'calc(100% - 20px)'}}
                        value={otp}
                        onChange={(event) => {setOtp(event.target.value)}}
                        type="number"
                        required={true}
                    />
                </>
            }
            <Button variant="outlined" className="mt-30" color="primary" onClick={onButtonClick}>{buttonLabel}</Button>
        </>}
    />)
}

export default LoginComponent;