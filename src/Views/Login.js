import React, { Component } from 'react';
import {withRouter} from "react-router-dom";


class Login extends Component {

  render(){
    return (
      <div >
        <h3>Logueate desde tu tenant!!!!!!!!!!!!!!!!!!!!!!!!! </h3>
        <a href= "https://trusted-archive.herokuapp.com/safelayer/login"> Click aqui para Safelayer</a>
      </div>
    );
  }

}

export default withRouter(Login);