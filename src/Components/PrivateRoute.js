import { Route, Redirect } from "react-router-dom";
import React from "react";
import Cookies from 'js-cookie';


const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        Cookies.get('access_token') ?
        ( 
            Cookies.get('expires_token')  > new Date().getTime() ?
            <Component {...props} />
            : <Redirect to={{ pathname: '/external', state: { from: props.location } }} />)

        : 
        <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
);

export default PrivateRoute;