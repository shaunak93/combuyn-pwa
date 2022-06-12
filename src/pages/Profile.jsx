import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import LoaderOverlay from "../components/base/LoaderOverlay";
import LoginComponent from "../components/LoginComponent";
import CommonHeader from "../components/headers/CommonHeader";
import PageBody from "../components/base/PageBody";
import FooterTabs from "../components/base/FooterTabs";
import ProfileMenu from "../flows/profile/ProfileMenu";
import OrderList from "../flows/profile/orders/OrderList";

import { checkIsLoggedIn } from "../utils/general";

function Profile(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(checkIsLoggedIn());
  const [showLoader, setShowLoader] = useState(false);
  const [pageState, setPageState] = useState(null);
  const [userDetails, setUserDetails] = useState({});

  const history = useHistory();

  const tokenDetails = useSelector((state) => state && state.token);

  useEffect(() => {
    if (tokenDetails && tokenDetails.expiresIn) {
      let { expiresIn } = tokenDetails;
      if (expiresIn && new Date(expiresIn).getTime() > new Date().getTime()) {
        setIsLoggedIn(true);
      }
    }

    //         accessToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDg0MTk5OTksImlhdCI6MTY0ODQxOTA5OSwic3ViIjoiNjIxMGE3OGEyMDc0ZTA3YTk4NTJlYzFkIn0.6NHe2qycXzKgveVjAtdhnTOrY8nhrBT6tXSNCO2434E"
    // expiresIn: "2022-03-27T22:26:39.015Z"
    // refreshToken: "6210a78a2074e07a9852ec1d.9da47de82ff508daed64a70cc3e22f70035c19899e6e3f7119eb4ee1a0695ae818783fc463daa285"
    // tokenType: "Bearer"
  }, [tokenDetails]);

  const onBackClick = () => {
    if (!pageState) {
      history.push(`/home`);
    } else {
      setPageState(null);
    }
  };

  const getComponent = () => {
    switch (pageState) {
      case "addresses":
        return <></>;
        break;
      case "orders":
        return <OrderList onBackClick={onBackClick} />;
        break;
      case "payments":
        return <></>;
        break;
      default:
        return <ProfileMenu onMenuOptionClick={setPageState} />;
        break;
    }
  };

  const getTitle = () => {
    switch (pageState) {
      case "addresses":
        return "My Addresses";
        break;
      case "orders":
        return "My Orders";
        break;
      case "payments":
        return <></>;
        break;
      default:
        return "Profile";
        break;
    }
  };

  return (
    <div className="profile-page">
      <CommonHeader onBackClick={onBackClick} title={getTitle()} />
      <PageBody>
        {isLoggedIn ? (
          <>
            <LoaderOverlay show={showLoader} />
            {getComponent()}
          </>
        ) : (
          <>
            <p
              style={{
                textAlign: "center",
                fontWeight: "600",
                fontSize: "16px",
                color: "#4D4D4D",
              }}
            >
              Please login to continue.
            </p>
            <LoginComponent
              callbackOnSuccess={() => {
                setIsLoggedIn(true);
              }}
            />
          </>
        )}
      </PageBody>
      <FooterTabs value="profile" />
    </div>
  );
}

export default Profile;
