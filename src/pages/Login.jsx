import React from "react";
import LoginComponent from "../components/LoginComponent";

function Login(props) {
  return (
    <div className="login-page">
      <img className="banner-img" src="./combuynBanner.png" alt="loading..." />
      <p className="header">Sign in</p>
      <LoginComponent />
    </div>
  );
}

export default Login;
