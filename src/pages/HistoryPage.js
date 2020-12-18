import Axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import { api_url } from "../helpers/api_url";
import { Button, Table } from "reactstrap";
import { HistoryModal } from "../components";
import { cancelCheckOutAction } from "../redux/action";

class HistoryPage extends Component {
  state = {
    data: [],
    modalOpen: false,
    selectedData: null,
    refetch: false,
  };

  componentDidMount() {
    // ambil data ketika masuk ke dalam komponen ini
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    // Refresh bisa ambil data
    const { userID } = this.props;
    if (prevProps.userID !== userID) {
      this.fetchData();
    }
    if (this.state.refetch) {
      this.fetchData();
      this.setState({
        refetch: false,
      });
    }
  }

  fetchData = () => {
    const { userID } = this.props;
    Axios.get(`${api_url}/transaction?userID=${userID}`)
      .then((res) => {
        this.setState({
          data: res.data,
        });
        console.log(res.data, "data in");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  toggle = (index) => {
    this.setState({
      modalOpen: !this.state.modalOpen,
      selectedData: index,
    });
  };

  cancelCheckOut = (id) => {
    this.props.cancelCheckOutAction(id);

    this.setState({
      refetch: true,
    });
  };

  renderTable = () => {
    const { data } = this.state;
    return data.map((val, index) => {
      return (
        <tr key={index}>
          <td>{val.id}</td>
          <td>{val.date}</td>
          <td>Rp.{val.total.toLocaleString()}</td>
          <td>{val.status}</td>
          <td>
            <Button color="info" onClick={() => this.toggle(index)}>
              Show items
            </Button>
          </td>
          <td>
            <Button color="danger" onClick={() => this.cancelCheckOut(val.id)}>
              Cancel
            </Button>
          </td>
        </tr>
      );
    });
  };

  render() {
    const { modalOpen, selectedData, data } = this.state;
    return (
      <div>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Total</th>
              <th>Status</th>
              <th>Items</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{this.renderTable()}</tbody>
        </Table>
        <HistoryModal
          modalOpen={modalOpen}
          toggle={this.toggle}
          data={data[selectedData]}
        />
      </div>
    );
  }
}

const mapStatetoProps = ({ user }) => {
  return {
    userID: user.id,
  };
};

export default connect(mapStatetoProps, { cancelCheckOutAction })(HistoryPage);
