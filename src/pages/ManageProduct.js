import Axios from "axios";
import React, { Component } from "react";
import { api_url } from "../helpers/api_url";
import { Button, Input, Table } from "reactstrap";

class ManageProduct extends Component {
  state = {
    data: [],
    selectedData: null,
    inputData: {
      name: "",
      categoryID: 0,
      image: "",
      price: 0,
      stock: 0,
    },
    inputAdd: {
      name: "",
      categoryID: 0,
      image: "",
      price: 0,
      stock: 0,
    },
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    Axios.get(`${api_url}/products`)
      .then((res) => {
        this.setState({
          data: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  deleteData = (id) => {
    Axios.delete(`${api_url}/products/${id}`)
      .then((res) => {
        Axios.get(`${api_url}/products`).then((res) => {
          this.setState({
            data: res.data,
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  editData = (id) => {
    const data = this.state.data.find((val) => val.id === id);
    this.setState({
      selectedData: id,
      inputData: data,
    });
  };

  cancelEdit = () => {
    this.setState({
      selectedData: null,
    });
  };

  confirmEdit = (id) => {
    const { inputData } = this.state;
    Axios.patch(`${api_url}/products/${id}`, {
      ...inputData,
      price: parseInt(inputData.price),
      stock: parseInt(inputData.stock),
      categoryID: parseInt(inputData.categoryID),
    })
      .then(() => {
        this.fetchData();
        this.setState({
          selectedData: null,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  addData = () => {
    const { inputAdd } = this.state;
    Axios.post(`${api_url}/products`, {
      ...inputAdd,
      price: parseInt(inputAdd.price),
      stock: parseInt(inputAdd.stock),
      categoryID: parseInt(inputAdd.categoryID),
    })
      .then(() => {
        console.log("masuk");
        this.fetchData();
        this.setState({
          inputAdd: {
            name: "",
            categoryID: 0,
            image: "",
            price: 0,
            stock: 0,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onChangeInput = (e) => {
    this.setState({
      inputData: {
        ...this.state.inputData,
        [e.target.id]: e.target.value,
      },
    });
    console.log(this.state.inputData);
  };
  onChangeInputAdd = (e) => {
    this.setState({
      inputAdd: {
        ...this.state.inputAdd,
        [e.target.id]: e.target.value,
      },
    });
    console.log(this.state.inputAdd);
  };

  renderList = () => {
    return this.state.data.map((val) => {
      if (this.state.selectedData === val.id) {
        return (
          <tr>
            <td>{val.id}</td>
            <td>
              <Input
                placeholder="Name"
                defaultValue={val.name}
                id="name"
                onChange={this.onChangeInput}
              />
            </td>
            <td>
              <Input
                placeholder="category id"
                defaultValue={val.categoryID}
                id="categoryID"
                onChange={this.onChangeInput}
              />
            </td>
            <td>
              <Input
                placeholder="image"
                defaultValue={val.image}
                id="image"
                onChange={this.onChangeInput}
              />
            </td>
            <td>
              <Input
                placeholder="price"
                defaultValue={val.price}
                id="price"
                onChange={this.onChangeInput}
              />
            </td>
            <td>
              <Input
                placeholder="stock"
                defaultValue={val.stock}
                id="stock"
                onChange={this.onChangeInput}
              />
            </td>
            <td>
              <Button onClick={this.cancelEdit}>Cancel</Button>
            </td>
            <td>
              <Button color="info" onClick={() => this.confirmEdit(val.id)}>
                Save
              </Button>
            </td>
          </tr>
        );
      }
      return (
        <tr key={val.id}>
          <td>{val.id}</td>
          <td>{val.name}</td>
          <td>{val.categoryID}</td>
          <td>
            <img src={val.image} alt={`${val.name}.jpeg`} height="100px" />
          </td>
          <td>Rp.{val.price.toLocaleString()}</td>
          <td>{val.stock}</td>
          <td>
            <Button
              color="success"
              style={{ width: "75%" }}
              onClick={() => this.editData(val.id)}
            >
              Edit
            </Button>
          </td>
          <td>
            <Button
              color="danger"
              style={{ width: "75%" }}
              onClick={() => this.deleteData(val.id)}
            >
              Delete
            </Button>
          </td>
        </tr>
      );
    });
  };

  render() {
    const { name, categoryID, image, stock, price } = this.state.inputAdd;
    return (
      <div>
        <Table style={{ textAlign: "center" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category ID</th>
              <th>Image</th>
              <th>Price</th>
              <th>Stock</th>
              <th colSpan="2">Action</th>
            </tr>
          </thead>
          <tbody>{this.renderList()}</tbody>
          <tfoot>
            <tr>
              <td>#</td>
              <td>
                <Input
                  onChange={this.onChangeInputAdd}
                  placeholder="name"
                  id="name"
                  value={name}
                />
              </td>
              <td>
                <Input
                  onChange={this.onChangeInputAdd}
                  placeholder="category id"
                  id="categoryID"
                  value={categoryID}
                />
              </td>
              <td>
                <Input
                  onChange={this.onChangeInputAdd}
                  placeholder="image"
                  id="image"
                  value={image}
                />
              </td>
              <td>
                <Input
                  onChange={this.onChangeInputAdd}
                  placeholder="price"
                  id="price"
                  value={price}
                />
              </td>
              <td>
                <Input
                  onChange={this.onChangeInputAdd}
                  placeholder="stock"
                  id="stock"
                  value={stock}
                />
              </td>
              <td colSpan={2}>
                <Button onClick={this.addData} color="info">
                  Add
                </Button>
              </td>
            </tr>
          </tfoot>
        </Table>
      </div>
    );
  }
}

export default ManageProduct;
