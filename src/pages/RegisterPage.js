import Axios from "axios";
import React, { Component } from "react";
import { Button, Input } from "reactstrap";
import { api_url } from "../helpers/api_url";
import { connect } from "react-redux";
import { loginAction } from "../redux/action";
import { Link, Redirect } from "react-router-dom";

class RegisterPage extends Component {
  state = {
    email: "",
    password: "",
    confirmPass: "",
  };

  // Register = tambah data ke dalam database (db.json)
  // tambah data menggunakan Axios.post(url, data)
  // Ketika data berhasil masuk ke dalam database
  // data yang baru saja dimasukkan ke dalam database masuk juga ke redux ke global state
  // Login automatis setelah register

  clickRegister = () => {
    const { email, password, confirmPass } = this.state;
    if (password === confirmPass) {
      Axios.get(`${api_url}/users?email=${email}`)
        .then((res) => {
          if (res.data.length === 0) {
            Axios.post(`${api_url}/users`, {
              email: email,
              password: password,
            }).then((res) => {
              console.log(res.data);
              this.props.loginAction(res.data);
              localStorage.setItem("id", res.data.id);
            });
          } else {
            alert("Email already taken");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Invalid password");
    }
  };

  onChangeInput = (e) => {
    this.setState({
      ...this.state,
      [e.target.id]: e.target.value,
    });
    console.log(this.state);
  };

  render() {
    if (this.props.email !== "") {
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
              <h1>Join us!</h1>
            </div>
            <div>
              <h4>Register to create a YudhoStore account </h4>
            </div>
          </div>
          <div className="my-2" style={{ width: "25%" }}>
            <Input
              placeholder="Email"
              id="email"
              type="email"
              value={this.state.email}
              onChange={this.onChangeInput}
              style={{ textAlign: "center" }}
            />
          </div>
          <div className="my-2" style={{ width: "25%" }}>
            <Input
              placeholder="Password"
              id="password"
              type="password"
              value={this.state.password}
              onChange={this.onChangeInput}
              style={{ textAlign: "center" }}
            />
          </div>
          <div className="my-2" style={{ width: "25%" }}>
            <Input
              placeholder="Confirm Password"
              id="confirmPass"
              type="password"
              value={this.state.confirmPass}
              onChange={this.onChangeInput}
              style={{ textAlign: "center" }}
            />
          </div>
          <div className="my-2" style={{ width: "25%" }}>
            <Button
              onClick={this.clickRegister}
              color="info"
              style={{ width: "100%" }}
            >
              Register
            </Button>
          </div>
          <div className="my-5" style={{ width: "25%", textAlign: "center" }}>
            <h5>Have an account?</h5>
            <Link to="/login">
              <p>Click here to log in!</p>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    email: state.user.email,
  };
};

export default connect(mapStatetoProps, { loginAction })(RegisterPage);
