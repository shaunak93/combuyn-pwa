import React, {useEffect, useState} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import "./App.css";
import Home from './pages/Home';
import Login from './pages/Login';
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import {getGlobalVariables} from './apis/global-variables';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    getGlobalVariables();
  }, [])

  return (
    <>
      <Router>
        <div id="app" className="App"> 
            <Switch>
              <PublicRoute component={Home} path="/" exact/>
              <PublicRoute component={Home} path="/home" exact />
              <PublicRoute component={Login} path="/login" exact/>
            </Switch>
        </div>
      </Router>
      <ToastContainer style={{ margin: "0px 10px 10px",width: "calc(100% - 20px)"}}/>
    </>
    
  );
}

// <Route path="/login">
//               <Login />
//             </Route>
//             <Route path="/campaign">
//               <Campaign2 />
//             </Route>
//             <Route path="/">
//               <Home/>
//             </Route

export default App;
