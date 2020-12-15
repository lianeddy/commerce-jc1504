import Axios from "axios";
import { api_url } from "../../helpers/api_url";
import swal from "sweetalert";

export const addToCartAction = (data) => {
  return (dispatch) => {
    Axios.post(`${api_url}/cart`, data)
      .then((res) => {
        console.log("data masuk");
        swal("Success!", "Product added to cart!", "success");
        dispatch({
          type: "ADD_TO_CART",
        });
      })
      .catch((err) => {
        console.log(err);
        swal(
          "Something went wrong",
          "Please contact an Administrator",
          "error"
        );
      });
  };
};

export const getCartByIdAction = (id) => {
  return (dispatch) => {
    Axios.get(`${api_url}/cart?userID=${id}`)
      .then(({ data }) => {
        dispatch({
          type: "FETCH_CART",
          payload: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const deleteCartAction = (id, userID) => {
  return (dispatch) => {
    Axios.delete(`${api_url}/cart/${id}`)
      .then((res) => {
        swal("Success!", "Product deleted from cart!", "success");
        dispatch(getCartByIdAction(userID));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const checkOutAction = (data) => {
  return (dispatch) => {
    Axios.post(`${api_url}/transaction`, data)
      .then((res) => {
        console.log("masuk");
        data.items.forEach((val) => {
          Axios.delete(`${api_url}/cart/${val.id}`).then((res) => {
            console.log("deleted id", val.id);
          });
        });
        swal("Success!", "Thank you!", "success");
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
