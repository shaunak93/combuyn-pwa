import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import LoaderOverlay from "../components/base/LoaderOverlay";
import LoginComponent from "../components/LoginComponent";
import CommonHeader from "../components/headers/CommonHeader";
import PageBody from "../components/base/PageBody";
import FooterTabs from "../components/base/FooterTabs";
import ProfileMenu from "../components/ProfileMenu";
import OrderList from "../components/OrderList";

import { checkIsLoggedIn } from "../utils/general";

function Profile(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(checkIsLoggedIn());
  const [showLoader, setShowLoader] = useState(false);
  const [pageState, setPageState] = useState(null);

  const history = useHistory();

  const tokenDetails = useSelector((state) => state && state.token);

  useEffect(() => {
    if (tokenDetails && tokenDetails.expiresIn) {
      let { expiresIn } = tokenDetails;
      if (expiresIn && new Date(expiresIn).getTime() > new Date().getTime()) {
        setIsLoggedIn(true);
      }
    }
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
      case "orders":
        return <OrderList onBackClick={onBackClick} />;
      case "payments":
        return <></>;
      default:
        return <ProfileMenu onMenuOptionClick={setPageState} />;
    }
  };

  const getTitle = () => {
    switch (pageState) {
      case "addresses":
        return "My Addresses";
      case "orders":
        return "My Orders";
      case "payments":
        return <></>;
      default:
        return "Profile";
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
