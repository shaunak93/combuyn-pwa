import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { checkLoginStatus } from '../utils/authentication';

const PublicRoute = ({component: Component, restricted, route, ...rest}) => {
    return (
        // restricted = false meaning public route
        // restricted = true meaning restricted route
        <Route {...rest} render={props => <Component {...props}/>} />
    );
};

export default PublicRoute;