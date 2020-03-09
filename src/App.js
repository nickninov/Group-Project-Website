import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AsyncStorage } from "AsyncStorage";

import Home from "./Components/home/home";
import Layout from "./Components/core/layout";
import Results from "./Container/results";
import Product from "./Container/product";
import Checkout from "./Container/checkout/checkout";
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

  // ? #TODO why doesn't this work with the other functions, e.g. getToken and getCart, etc.
  // async asyncGet(attribute) {
  //   try {
  //     const value = await AsyncStorage.getItem(attribute);
  //     return value;
  //   } catch (err) {
  //     console.log("asyncGet() err: " + err);
  //   }
  // }

  // async asyncSet(attribute, value) {
  //   try {
  //     await AsyncStorage.setItem(attribute, value);
  //   } catch (err) {
  //     console.log("asyncSet() err: " + err);
  //   }
  // }

  // async getToken() {
  //   try {
  //     const value = await AsyncStorage.getItem("token");
  //     if (value !== null && value.split(" ")[0] == "Bearer") {
  //       return value;
  //     } else {
  //       return null;
  //     }
  //   } catch (err) {
  //     console.log("getToken() err: " + err);
  //   }
  // }

  // async setToken(token) {
  //   try {
  //     await AsyncStorage.setItem("token", token).then(() =>
  //       window.location.reload()
  //     );
  //   } catch (err) {
  //     console.log("setToken() err: " + err);
  //   }
  // }

  async getToken() {
    // #TODO replace and use asyncGet("token") for value, some reason it wasn't working for me
    const value = await AsyncStorage.getItem("token");
    if (value !== null && value.split(" ")[0] == "Bearer") {
      return value;
    } else {
      return null;
    }
  }

  async setToken(token) {
    // await this.asyncSet("token", token).then(() => window.location.reload());

    try {
      await AsyncStorage.setItem("token", token);
    } catch (err) {
      console.log("setToken() err: " + err);
    }
  }

  async resetToken() {
    // await this.asyncSet("token", null).then(() => window.location.reload());

    try {
      await AsyncStorage.setItem("token", null);
    } catch (err) {
      console.log("resetToken() err: " + err);
    }
  }

  // async getCart() {
  //   const value = await AsyncStorage.getItem("cart");

  //   if (typeof value === "undefined" || value === null) {
  //     await this.setCart({
  //       cart: []
  //     })
  //     return {
  //       cart: []
  //     };
  //   } else {
  //     return value;
  //   }

  //   // #TODO replace and use asyncGet("token") for value, some reason it wasn't working for me
  // }

  // async setCart(cart) {
  //   // await this.asyncSet("cart", cart).then(() => window.location.reload());

  //   try {
  //     await AsyncStorage.setItem("cart", cart);
  //   } catch (err) {
  //     console.log("setCart() err: " + err);
  //   }
  // }

  // async resetCart() {
  //   // await this.asyncSet("cart", null).then(() => window.location.reload());

  //   try {
  //     await AsyncStorage.setItem("cart", null);
  //   } catch (err) {
  //     console.log("resetCart() err: " + err);
  //   }
  // }

  render() {
    return (
      <React.Fragment>
        <Header resetToken={this.setToken} getToken={this.getToken} />
        <Layout>
          <Router>
            <Switch>
              {/* no requirements */}
              <Route exact path="/" component={Home} />
              <Route path="/results" component={Results} />
              {/* <Route path="/product/:id" component={Product} /> */}
              <Route
                path="/product/:id"
                render={props => (
                  <Product
                    match={props.match}
                    getToken={this.getToken}
                  />
                )}
              />

              {/* requires token */}
              <Route
                path="/account"
                render={() => <Account getToken={this.getToken} />}
              />
              <Route
                path="/checkout"
                render={() => <Checkout getToken={this.getToken} />}
              />

              {/* requires no token */}
              <Route
                path="/login"
                render={() => <AccountLogin setToken={this.setToken} />}
              />

              <Route
                path="/register"
                render={() => <AccountRegister setToken={this.setToken} />}
              />
            </Switch>
          </Router>
        </Layout>
      </React.Fragment>
    );
  }
}

export default App;
