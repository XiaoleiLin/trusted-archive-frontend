import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import { Route, Switch, Redirect } from "react-router-dom";
import queryString from 'query-string';
import Cookies from 'js-cookie';

import PrivateRoute from "./PrivateRoute"
import Home from "../Views/Home";
import Login from "../Views/Login";
import Logout from "../Views/Logout";

// const URI_LOGIN = "http://localhost:3000/"
// const URI_LOGIN = "https://trusted-archive.herokuapp.com/"

class Main extends Component{
    constructor( props ) {
        super( props )
        let params = queryString.parse(this.props.location.search)
        let options = {
            // domain: "localhost",
            // path: "/",
            // secure: true,
            sameSite: 'lax',
            expires: new Date(parseInt(params.expires_token))
        }
        if (params.access_token !== undefined)
            Cookies.set('access_token', params.access_token, options)
        if (params.expires_token !== undefined)
            Cookies.set('expires_token', params.expires_token, options)
        if (params.tenant !== undefined)
            Cookies.set('tenant', params.tenant, options)
    }

    render(){
        return (
            <div>
                <Switch>
                    {/* <Redirect exact from="/" exact to={"/" + Cookies.get('tenant') + "/login"} /> */}
                    <Redirect from="/" exact to={"/login"} />
                    <Redirect from="/home" exact to={"/" + Cookies.get('tenant') + "/home"} />
                    {}
                    <Route
                    path='/external' 
                    component={() => {
                        // window.location = "URI_LOGIN" + Cookies.get('tenant') + "/login"
                        window.location = "/" + Cookies.get('tenant') + "/login"
                        return null
                    }}
                    />
                    <Route path='/login' component={Login}/>
                    <Route path='/logout' component={Logout}/>
                    <PrivateRoute exact path={"/" + Cookies.get('tenant') + "/home"}  component={Home}/>
                </Switch>
            </div>
        )
    }
}

export default withRouter(Main);