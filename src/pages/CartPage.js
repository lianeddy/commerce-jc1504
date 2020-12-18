import React, { Component } from "react";
import { connect } from "react-redux";
import {
  checkOutAction,
  deleteCartAction,
  getCartByIdAction,
  editCartAction,
} from "../redux/action";
import { Button, Table } from "reactstrap";
import { Redirect } from "react-router-dom";

class CartPage extends Component {
  state = {
    redirectHome: false,
  };

  componentDidMount() {
    const { getCartByIdAction, userID } = this.props;
    getCartByIdAction(userID);
  }

  componentDidUpdate(prevProps) {
    const { userID, getCartByIdAction } = this.props;
    if (prevProps.userID !== userID) {
      getCartByIdAction(userID);
    }
  }

  deleteCart = (id) => {
    const { deleteCartAction, userID } = this.props;
    deleteCartAction(id, userID);
  };

  renderGrandTotal = () => {
    const { cartList } = this.props;
    let output = 0;
    // for(let i = 0; i< cartList.length ; i++){
    //     output += cartList[i].qty * cartList[i].price
    // }
    cartList.forEach((val) => {
      output += val.qty * val.price;
    });
    return output;
  };

  checkOut = () => {
    const checkOutBool = window.confirm("Confirm CheckOut?");
    if (checkOutBool) {
      const { cartList, userID, checkOutAction } = this.props;
      const date = new Date();
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const checkOutData = {
        date: `${day}-${month}-${year}`,
        total: this.renderGrandTotal(),
        items: cartList,
        userID: userID,
        status: "belum di bayar",
      };
      checkOutAction(checkOutData);
      this.setState({
        redirectHome: true,
      });
    }
  };

  decreaseCartQty = (id, qty) => {
    const { editCartAction, userID } = this.props;
    editCartAction({
      id: id,
      qty: qty - 1,
      userID,
    });
  };

  increaseCartQty = (id, qty, productID) => {
    const { editCartAction, userID, productList } = this.props;
    const stockAvailable = productList.find((val) => val.id === productID)
      .stock;
    if (qty === stockAvailable) {
      alert("Stock insufficient");
    } else {
      editCartAction({
        id: id,
        qty: qty + 1,
        userID,
      });
    }
  };

  renderTableBody = () => {
    return this.props.cartList.map((val, index) => {
      return (
        <tr>
          <td>{index + 1}</td>
          <td>{val.name}</td>
          <td>
            <img src={val.image} alt={`${val.name}.jpg`} height="150px" />
          </td>
          <td>
            <Button
              onClick={() =>
                this.decreaseCartQty(val.id, val.qty, val.productID)
              }
            >
              -
            </Button>
            <span className="mx-2">{val.qty}</span>
            <Button
              onClick={() =>
                this.increaseCartQty(val.id, val.qty, val.productID)
              }
            >
              +
            </Button>
          </td>
          <td>Rp.{(val.qty * val.price).toLocaleString()}</td>
          <td>
            <Button color="danger" onClick={() => this.deleteCart(val.id)}>
              Delete
            </Button>
          </td>
        </tr>
      );
    });
  };

  render() {
    const { redirectHome } = this.state;
    const { cartList } = this.props;
    if (redirectHome) {
      return <Redirect to="/" />;
    } else if (cartList.length === 0) {
      return (
        <div>
          <div>Cart Empty</div>
        </div>
      );
    }
    return (
      <div>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Image</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{this.renderTableBody()}</tbody>
          <tfoot>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td>Grand Total</td>
              <td>Rp. {this.renderGrandTotal().toLocaleString()}</td>
              <td>
                <Button color="info" onClick={this.checkOut}>
                  Check Out
                </Button>
              </td>
            </tr>
          </tfoot>
        </Table>
      </div>
    );
  }
}

const mapStatetoProps = ({ user, cart, products }) => {
  return {
    userID: user.id,
    cartList: cart.cart,
    productList: products.productList,
  };
};

export default connect(mapStatetoProps, {
  getCartByIdAction,
  deleteCartAction,
  checkOutAction,
  editCartAction,
})(CartPage);
