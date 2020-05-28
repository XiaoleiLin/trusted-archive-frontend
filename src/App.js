import React, { Component } from 'react';
import './App.css';
import {BrowserRouter} from "react-router-dom";

import Main from "./Components/Main";

class App extends Component {

  render() {
    return(
      
    // <BrowserRouter basename={window.location.pathname}>
    <BrowserRouter >
      <Main />
    </BrowserRouter>
    );
  }

}


export default App;
