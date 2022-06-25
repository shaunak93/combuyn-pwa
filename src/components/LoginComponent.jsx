import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Paper from "@material-ui/core/Paper";
import LoaderOverlay from "../components/base/LoaderOverlay";

import { showToast } from "../utils/general";
import { LOGIN_STEPS } from "../constants/authentication";
import { requestOTP, loginWithOTP } from "../apis/users";

import { updateUser } from "../store/actions/userActions";
import { updateToken } from "../store/actions/tokenActions";

function validateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  return false;
}

function LoginComponent(props) {
  let { callbackOnSuccess } = props;
  const { GET_OTP, ENTER_OTP } = LOGIN_STEPS;
  const history = useHistory();
  const dispatch = useDispatch();

  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentStep, setCurrentStep] = useState(GET_OTP);
  const [isLoading, setIsLoading] = useState(false);
  const [isNewUser, setIsNewUser] = useState(true);

  const requestUserOTP = async () => {
    setIsLoading(true);
    requestOTP({ mobileNumber: mobileNumber }, (err, res) => {
      setIsLoading(false);
      if (err) {
        showToast({
          type: "error",
          message: err,
        });
        return;
      } else {
        let { otp, type } = res;
        setOtp(otp);
        setCurrentStep(ENTER_OTP);
        setIsNewUser(type !== "login");
        setIsLoading(false);
      }
    });
  };

  const submitUserOTP = () => {
    setIsLoading(true);
    loginWithOTP({ mobileNumber: mobileNumber, otp: otp }, (err, res) => {
      setIsLoading(false);
      if (res) {
        let { token, user } = res;
        dispatch(updateUser(user));
        dispatch(updateToken(token));
        handleSuccesfulLogin();
      } else {
        console.log(err);
        showToast({
          type: "error",
          message: err,
        });
      }
    });
  };

  const handleSuccesfulLogin = () => {
    showToast({
      type: "success",
      message: "Login successful",
    });
    if (callbackOnSuccess) {
      callbackOnSuccess();
    } else {
      history.push("/home");
    }
  };

  const validate = () => {
    if (currentStep === ENTER_OTP) {
      if (isNewUser && !name) return "Name is required";
      if (isNewUser && !email) return "Email is required";
      if (isNewUser && !validateEmail(email))
        return "Please enter valid Email.";
      if (!otp) return "OTP is required";
    }
    if (currentStep === GET_OTP) {
      if (!mobileNumber) return "Mobile number is required";
    }
  };

  const onButtonClick = () => {
    let error = validate();
    if (error) {
      showToast({ type: "error", message: error });
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
  };

  return (
    <Paper
      elevation={0}
      className="login-component"
      children={
        <>
          <LoaderOverlay show={isLoading} />
          <TextField
            id="outlined-basic"
            className="mt-30 text-field"
            label="Mobile Number"
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">+91</InputAdornment>
              ),
            }}
            value={mobileNumber}
            disabled={currentStep === ENTER_OTP}
            onChange={(event) => {
              setMobileNumber(event.target.value);
            }}
            type="number"
          />
          {currentStep === ENTER_OTP && (
            <>
              {!!isNewUser && (
                <>
                  <TextField
                    id="outlined-basic"
                    className="mt-10 text-field"
                    label="Name"
                    variant="outlined"
                    size="small"
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                  />
                  <TextField
                    id="outlined-basic"
                    className="mt-10 text-field"
                    label="Email"
                    variant="outlined"
                    size="small"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                  />
                </>
              )}
              <TextField
                id="outlined-basic"
                className="mt-10 text-field"
                label="OTP"
                variant="outlined"
                size="small"
                value={otp}
                onChange={(event) => {
                  setOtp(event.target.value);
                }}
                type="number"
              />
            </>
          )}
          {currentStep === GET_OTP && (
            <button className="mt-30 get-otp-button" onClick={onButtonClick}>
              Get OTP
            </button>
          )}
          {currentStep === ENTER_OTP && (
            <button className="mt-40 enter-otp-button" onClick={onButtonClick}>
              Sign in
            </button>
          )}
        </>
      }
    />
  );
}

export default LoginComponent;
