import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarText,
  NavbarToggler,
  NavItem,
  NavLink,
  UncontrolledDropdown,
} from "reactstrap";
import { logoutAction } from "../redux/action";

class NavigationBar extends Component {
  state = {
    isOpen: false,
  };
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  renderDropdown = () => {
    if (this.props.email !== "") {
      return (
        <DropdownMenu right>
          <Link to="/">
            <DropdownItem>Profile</DropdownItem>
          </Link>
          <Link to="/cart">
            <DropdownItem>Cart</DropdownItem>
          </Link>
          <Link to="/history-transaction">
            <DropdownItem>History</DropdownItem>
          </Link>
          <Link to="/manage-product">
            <DropdownItem>Manage Products</DropdownItem>
          </Link>
          <Link to="/">
            <DropdownItem onClick={this.props.logoutAction}>
              Log Out
            </DropdownItem>
          </Link>
        </DropdownMenu>
      );
    } else {
      return (
        <DropdownMenu right>
          <Link to="/login">
            <DropdownItem>Login</DropdownItem>
          </Link>
          <Link to="/register">
            <DropdownItem>Register</DropdownItem>
          </Link>
        </DropdownMenu>
      );
    }
  };
  render() {
    return (
      <div>
        <Navbar
          style={{ backgroundColor: "#138496", color: "white" }}
          dark
          expand="md"
        >
          <Link to="/">
            <NavbarBrand>YudhoStore</NavbarBrand>
          </Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <Link to="/products">
                <NavItem>
                  <NavLink>Products</NavLink>
                </NavItem>
              </Link>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  User
                </DropdownToggle>
                {this.renderDropdown()}
                {/* {this.props.email !== "" ? (
                  <DropdownMenu right>
                    <Link to="/">
                      <DropdownItem>Profile</DropdownItem>
                    </Link>
                    <Link to="/">
                      <DropdownItem>Log Out</DropdownItem>
                    </Link>
                  </DropdownMenu>
                ) : (
                  <DropdownMenu right>
                    <Link to="/login">
                      <DropdownItem>Login</DropdownItem>
                    </Link>
                    <Link to="/register">
                      <DropdownItem>Register</DropdownItem>
                    </Link>
                  </DropdownMenu>
                )} */}
              </UncontrolledDropdown>
            </Nav>
            {this.props.email ? (
              <NavbarText>{this.props.email}</NavbarText>
            ) : null}
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStatetoProps = ({ user }) => {
  return {
    email: user.email,
  };
};

export default connect(mapStatetoProps, { logoutAction })(NavigationBar);
