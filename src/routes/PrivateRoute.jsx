import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
let myStorage = window.localStorage;;

const PrivateRoute = ({component: Component, ...rest}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!myStorage.getItem('access_token'));

    return (
        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            isLoggedIn?
                <Component {...props} />
            : <Redirect to="/login" />
        )} />
    );
};

export default PrivateRoute;