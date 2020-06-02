import React, { Component } from 'react';
import {withRouter} from "react-router-dom";

import AppBar from "../Components/AppBar";
import Archive from "../Components/Archive";
import { ServiceArchive } from "../Services/ServiceArchive";

class Home extends Component {
  constructor( props ) {
		super( props )
		this.state = {
      canLogout: false,
		}
  }
  componentDidMount(){
    this.getUserInfo()
  }

  async getUserInfo () {
    // let res = await ServiceArchive.aboutMe()
    // if(res.authn_details.directSso === "false") this.setState({canLogout: true})
    // this.setState({name: res.name, directSso: res.authn_details.directSso})
  }

  render(){
    
    return (
      <div >
        <AppBar canLogout={this.state.canLogout}/>
        <Archive/>
      </div>
    );
  }

}

export default withRouter(Home);