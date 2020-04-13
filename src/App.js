import React from "react";

// containers
import Home from "./Container/home";
import Results from "./Container/results";
import Product from "./Container/product";
import Checkout from "./Container/checkout";
import Account from "./Container/account/account";
import Order from "./Container/order";
import Header from "./Container/header";
import AccountLogin from "./Container/account/account_login";
import AccountRegister from "./Container/account/account_register";

// components
import Search from "./Components/search/search";
import Layout from "./Components/core/layout";

// packages
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AsyncStorage } from "AsyncStorage";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: true, // token exists
    };
  }

  // get from user token from storage
  async getToken() {
    const value = await AsyncStorage.getItem("token");
    if (value != null && value.split(" ")[0] === "Bearer") {
      return value;
    } else {
      return null;
    }
  }

  // set user token to storage
  async setToken(token) {
    try {
      await AsyncStorage.setItem("token", token).then(() =>
        window.location.reload()
      );
    } catch (err) {
      console.log("setToken() err: " + err);
    }
  }

  // reset user token in storage
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
            {/* unprotected */}
            <Route
              exact
              path="/"
              render={(props) => (
                <Home history={props.history} getToken={this.getToken} />
              )}
            />
            <Route
              path="/search/:id"
              render={(props) => (
                <Search match={props.match} history={props.history} />
              )}
            />
            <Route
              path="/product/:id"
              render={(props) => (
                <Product match={props.match} getToken={this.getToken} />
              )}
            />

            {/* authentication */}
            <Route
              path="/login"
              render={() => <AccountLogin setToken={this.setToken} />}
            />
            <Route
              path="/register"
              render={() => <AccountRegister setToken={this.setToken} />}
            />

            {/* protected */}
            <Route
              path="/checkout"
              render={(props) => (
                <Checkout history={props.history} getToken={this.getToken} />
              )}
            />
            <Route
              path="/account"
              render={(props) => (
                <Account history={props.history} getToken={this.getToken} />
              )}
            />
            <Route
              path="/order/:id"
              render={(props) => (
                <Order
                  match={props.match}
                  history={props.history}
                  getToken={this.getToken}
                />
              )}
            />
          </Switch>
        </Layout>
        <footer style={{ margin: "50px 0", width: "100%" }}>
          <p style={{ textAlign: "center" }}>
            © 2020 - Nerd Station. All rights reserved.
          </p>
        </footer>
      </Router>
    );
  }
}

export default App;
