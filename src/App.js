import React from 'react';
import {
  BrowserRouter as Router, Route, Switch
} from 'react-router-dom';
import { Home } from './Components/Home';
import { Account } from './Components/Account';
import { Basket } from './Components/Basket';
import { Layout } from './Components/Layout';
import { Results } from './Components/results_view/results';
import { Product } from './Components/product_view/product';
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
              <Route path="/results" component={Results} />
              <Route path="/product" component={Product} />
            </Switch>
          </Router>
        </Layout>
      </React.Fragment>
    );
  }
}

export default App;