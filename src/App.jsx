import React, {useEffect, useState} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import "./App.css";
import Campaign from './pages/Campaign';
import Home from './pages/Home';
import Login from './pages/Login';
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import {getGlobalVariables} from './apis/global-variables';
import {checkAndRefreshAccessToken} from './apis/users';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  
  useEffect(() => {
    getGlobalVariables();
    checkAndRefreshAccessToken();
  }, [])

  return (
    <>
      <Router>
        <div id="app" className="App"> 
            <Switch>
              <PublicRoute component={Home} path="/home" exact/>
              <PublicRoute component={Campaign} path="/campaign/:id" exact/>
              <PublicRoute component={Login} path="/login" exact/>
              <PublicRoute component={Home} path="*" exact/>
            </Switch>
        </div>
      </Router>
      <ToastContainer style={{ margin: "0px 10px 10px",width: "calc(100% - 20px)"}}/>
    </>
  );
}

export default App;
