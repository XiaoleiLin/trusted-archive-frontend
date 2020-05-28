import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import { Route, Switch, Redirect } from "react-router-dom";
import queryString from 'query-string';
import Cookies from 'js-cookie';

import PrivateRoute from "./PrivateRoute"
import Home from "../Views/Home";
import Login from "../Views/Login";

// const URI_LOGIN = "http://localhost:3000/"
// const URI_LOGIN = "https://trusted-archive.herokuapp.com/"

class Main extends Component{
    constructor( props ) {
        super( props )
        
        let params = queryString.parse(this.props.location.search)
        let end = new Date(new Date().getTime() + params.expires_token *1000)
        if (params.access_token !== undefined)
            Cookies.set('access_token', params.access_token)
        if (params.expires_token !== undefined)
            Cookies.set('expires_token', end.getTime())
        if (params.tenant !== undefined)
            Cookies.set('tenant', params.tenant)
    }

    render(){
        return (
            <div>
                <Switch>
                    <Redirect from="/" exact to={"/" + Cookies.get('tenant') + "/home"} />
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
                    <PrivateRoute exact path={"/" + Cookies.get('tenant') + "/home"}  component={Home}/>
                </Switch>
            </div>
        );
    }
}

export default withRouter(Main);