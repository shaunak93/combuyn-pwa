import React from "react";
import { Route } from "react-router-dom";

const PublicRoute = ({ component: Component, restricted, route, ...rest }) => {
  console.log("rest", rest);
  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route
      {...rest}
      render={(props) => {
        console.log(props);
        return <Component {...props} />;
      }}
    />
  );
};

export default PublicRoute;
