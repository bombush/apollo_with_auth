import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import SurgeonsList from './SurgeonsList';

const Layout = (props) => (
  <div className="App">
    <header className="App-header">
      <img src={`/${logo}`} className="App-logo" alt="logo" />
      <h1 className="App-title">List of surgeons</h1>
      <h2>Clicking on a surgeon will show his treatments</h2>
    </header>
    <Link to="/surgeons">Start watching surgeons</Link>
    <Route path="/surgeons" component={SurgeonsList}/>
  </div>
)

export default Layout;