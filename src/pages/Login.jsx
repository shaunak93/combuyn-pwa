import React from 'react';
import LoginComponent from '../components/LoginComponent'

function Login(props) {
    return (
        <div style={{backgroundColor: '#f7f7f7', height: '100%'}}>
            <img style={{width: '100%', paddingTop: '50px'}} src="./combuynBanner.png"/>
            <LoginComponent/>
        </div>
        
    )
}

export default Login;