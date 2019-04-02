import React, { Component } from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="page">
          <Route exact path='/' component={homepage}/>
          <Route path='/login' component={login}/>
        </div>
      </Router>
    );
  }
}

const homepage = () => {
  return (
    <div>
      homepage
    </div>
  );
};

const login = () => {
  return (
    <dig>
      login
    </dig>
  );
};

export default App;
