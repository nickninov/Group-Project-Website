import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AsyncStorage } from "AsyncStorage";

import Home from "./Components/home/home";
import Layout from "./Components/core/layout";
import Results from "./Container/results";
import Product from "./Container/product";
import Checkout from "./Container/checkout";
import Account from "./Container/account/account";

import Header from "./Container/header";
import AccountLogin from "./Container/account/account_login";
import AccountRegister from "./Container/account/account_register";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: true
    };
  }

  async getToken() {
    // #TODO replace and use asyncGet("token") for value, some reason it wasn't working for me
    const value = await AsyncStorage.getItem("token");
    if (value !== null && value.split(" ")[0] === "Bearer") {
      return value;
    } else {
      return null;
    }
  }

  async setToken(token) {
    try {
      await AsyncStorage.setItem("token", token).then(() =>
        window.location.reload()
      );
    } catch (err) {
      console.log("setToken() err: " + err);
    }
  }

  async resetToken() {
    try {
      await AsyncStorage.setItem("token", null).then(() =>
        window.location.reload()
      );
    } catch (err) {
      console.log("resetToken() err: " + err);
    }
  }

  render() {
    return (
      <Router>
        <Header resetToken={this.setToken} getToken={this.getToken} />
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/results" component={Results} />
            <Route
              path="/product/:id"
              render={props => (
                <Product match={props.match} getToken={this.getToken} />
              )}
            />
            <Route
              path="/account"
              render={() => <Account getToken={this.getToken} />}
            />
            <Route
              path="/checkout"
              render={props => (
                <Checkout history={props.history} getToken={this.getToken} />
              )}
            />
            <Route
              path="/login"
              render={() => <AccountLogin setToken={this.setToken} />}
            />
            <Route
              path="/register"
              render={() => <AccountRegister setToken={this.setToken} />}
            />
          </Switch>
        </Layout>
      </Router>
    );
  }
}

export default App;
