import Axios from "axios";
import React, { Component } from "react";
import { Button, Input } from "reactstrap";
import { api_url } from "../helpers/api_url";
import { loginAction } from "../redux/action";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

class LoginPage extends Component {
  state = {
    loginInfo: {
      email: "",
      password: "",
    },
  };

  onChangeInput = (e) => {
    this.setState({
      loginInfo: {
        ...this.state.loginInfo,
        [e.target.id]: e.target.value,
      },
    });
  };

  clickLogin = () => {
    const { email, password } = this.state.loginInfo;
    Axios.get(`${api_url}/users?email=${email}&password=${password}`)
      .then((res) => {
        if (res.data.length !== 0) {
          this.props.loginAction(res.data[0]);
          localStorage.setItem("id", res.data[0].id);
        } else {
          alert("User Invalid");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { email, password } = this.state.loginInfo;
    if (this.props.emailUser !== "") {
      return <Redirect to="/" />;
    }
    return (
      <div style={{ height: "100vh" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
          className="py-5"
        >
          <div style={{ textAlign: "center" }}>
            <div>
              <h1>Welcome Back!</h1>
            </div>
            <div>
              <h4>Log in to access your YudhoStore account</h4>
            </div>
          </div>
          <div className="my-2" style={{ width: "25%" }}>
            <Input
              placeholder="Email"
              id="email"
              type="email"
              value={email}
              onChange={this.onChangeInput}
              style={{ textAlign: "center" }}
            />
          </div>
          <div className="my-2" style={{ width: "25%" }}>
            <Input
              placeholder="Password"
              id="password"
              type="password"
              value={password}
              onChange={this.onChangeInput}
              style={{ textAlign: "center" }}
            />
          </div>
          <div className="my-2" style={{ width: "25%" }}>
            <Button
              onClick={this.clickLogin}
              color="info"
              style={{ width: "100%" }}
            >
              Login
            </Button>
          </div>
          <div className="my-5" style={{ width: "25%", textAlign: "center" }}>
            <h5>Don't have an account?</h5>
            <Link to="/register">
              <p>Click here to register!</p>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    emailUser: state.user.email,
  };
};

export default connect(mapStatetoProps, { loginAction })(LoginPage);
