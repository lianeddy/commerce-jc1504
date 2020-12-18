// import Axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { NavigationBar } from "./components";
// import { api_url } from "./helpers/api_url";
import {
  Landing,
  LoginPage,
  RegisterPage,
  ProductPage,
  ProductDetail,
  CartPage,
  HistoryPage,
  ManageProduct,
} from "./pages";
import { keepLogin, getCartByIdAction } from "./redux/action";

class App extends Component {
  state = {};

  componentDidMount() {
    const id = localStorage.getItem("id");
    if (id) {
      // Axios.get(`${api_url}/users/${id}`)
      //   .then((res) => {
      //     this.props.loginAction(res.data);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
      this.props.keepLogin(id);
      this.props.getCartByIdAction(id);
    }
  }

  render() {
    return (
      <div>
        <NavigationBar />
        <Route path="/" exact component={Landing} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/products" component={ProductPage} />
        <Route path="/product-detail" component={ProductDetail} />
        <Route path="/cart" component={CartPage} />
        <Route path="/history-transaction" component={HistoryPage} />
        <Route path="/manage-product" component={ManageProduct} />
        <ToastContainer />
      </div>
    );
  }
}

export default connect(null, { keepLogin, getCartByIdAction })(App);
