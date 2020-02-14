import React, { Component } from 'react';
import {
  BrowserRouter as Router, Route, Switch
} from 'react-router-dom';
import { Home } from './Components/Home';
import { Account } from './Components/Account';
import { Basket } from './Components/Basket';
import { Layout } from './Components/Layout';
//import { Product } from (dir of component);
import { NavigationBar } from './Components/NavigationBar';
//import './App.css';

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <NavigationBar/>
        <Layout>
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/account" component={Account} />
              <Route path="/basket" component={Basket} />
              <Route path="/product" component={Product} />
            </Switch>
          </Router>
        </Layout>
      </React.Fragment>
      
    );
  }
}

export default App;