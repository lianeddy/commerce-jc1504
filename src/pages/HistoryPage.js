import Axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import { api_url } from "../helpers/api_url";
import { Button, Table } from "reactstrap";
import { HistoryModal } from "../components";

class HistoryPage extends Component {
  state = {
    data: [],
    modalOpen: false,
    selectedData: null,
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
  }

  fetchData = () => {
    const { userID } = this.props;
    Axios.get(`${api_url}/transaction?userID=${userID}`)
      .then((res) => {
        this.setState({
          data: res.data,
        });
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

  renderTable = () => {
    const { data } = this.state;
    return data.map((val, index) => {
      return (
        <tr key={index}>
          <td>{val.id}</td>
          <td>{val.date}</td>
          <td>Rp.{val.total.toLocaleString()}</td>
          <td>
            <Button color="info" onClick={() => this.toggle(index)}>
              Show items
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
              <th>Items</th>
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

export default connect(mapStatetoProps)(HistoryPage);
