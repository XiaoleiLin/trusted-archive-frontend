import React, { Component } from 'react';
import {withRouter} from "react-router-dom";

import AppBar from "../Components/AppBar";
import Archive from "../Components/Archive";


class Login extends Component {
  
  render(){
    
    return (
      <div >
        <AppBar/>
        <Archive/>
      </div>

    );
  }

}

export default withRouter(Login);