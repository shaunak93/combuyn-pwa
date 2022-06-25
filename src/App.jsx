import "react-toastify/dist/ReactToastify.css";

import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { useReactPWAInstall } from "react-pwa-install";
import { ToastContainer } from "react-toastify";

import "./App.css";
import "./app.scss";
import PublicRoute from "./routes/PublicRoute";
import { checkAndRefreshAccessToken } from "./apis/users";

import Campaign from "./pages/Campaign";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";

import CombuynIconSmall from "./assets/combuynIconSmall.png";

function App() {
  const { pwaInstall, supported, isInstalled } = useReactPWAInstall();
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useEffect(() => {
    checkAndRefreshAccessToken();
  }, []);

  const handleInstall = () => {
    pwaInstall({
      title: "Install Combuyn",
      logo: CombuynIconSmall,
    })
      .then(() => {})
      .catch(() => {});
  };

  return (
    <>
      <Router>
        <div id="app" className="App">
          <Switch>
            <PublicRoute component={Login} path="/login" exact />
            <PublicRoute component={Home} path="/home" exact />
            <PublicRoute component={Campaign} path="/campaign/:id" exact />
            <PublicRoute component={Profile} path="/profile" exact />
            <PublicRoute component={Cart} path="/cart" exact />
            <PublicRoute component={Home} path="*" exact />
          </Switch>
        </div>
      </Router>
      <ToastContainer
        style={{ margin: "0px 10px 10px", width: "calc(100% - 20px)" }}
      />
      {showInstallPrompt && supported() && !isInstalled() && (
        <div
          style={{
            position: "fixed",
            width: "100%",
            height: "100%",
            background: "#000000cf",
          }}
        >
          <div
            style={{
              position: "absolute",
              bottom: "10px",
              width: "90%",
              left: "5%",
              height: "auto",
              backgroundColor: "rgb(255, 255, 255)",
              borderRadius: "25px",
            }}
          >
            <div
              style={{
                height: "30px",
                borderBottom: "1px solid rgb(170, 170, 170)",
                margin: "10px 10px 0px",
                paddingTop: "10px",
                padding: "10px 20px",
              }}
            >
              <span
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "#3785B8",
                }}
              >
                Install Combuyn
              </span>
            </div>
            <div
              style={{
                height: "auto",
                margin: "0px 10px",
                padding: "30px 30px 40px",
              }}
            >
              <p
                style={{
                  fontSize: "18px",
                  fontWeight: "400",
                  color: "rgb(77, 77, 77)",
                  margin: "auto",
                }}
              >
                Install our app to get latest deals and enjoy bulk pricing
              </p>
            </div>
            <div
              onClick={handleInstall}
              style={{
                height: "30px",
                padding: "10px 20px",
                textAlign: "center",
                borderRadius: "0 0 25px 25px",
                backgroundColor: "#fff",
              }}
            >
              <p
                style={{
                  width: "max-content",
                  margin: "auto",
                  color: "#FFA64D",
                  fontWeight: "bold",
                  fontSize: "25px",
                }}
              >
                Install
              </p>
            </div>
            <span
              onClick={() => {
                setShowInstallPrompt(false);
              }}
              style={{
                fontSize: "25px",
                fontWeight: "bold",
                color: "rgb(255, 255, 255)",
                height: "33px",
                width: "33px",
                borderRadius: "16px",
                background: "rgb(77, 77, 77)",
                textAlign: "center",
                top: "-10px",
                right: "-10px",
                position: "absolute",
              }}
            >
              x
            </span>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
