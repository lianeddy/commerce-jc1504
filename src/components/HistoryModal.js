import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
} from "reactstrap";

class HistoryModal extends Component {
  renderItems = () => {
    const { data } = this.props;
    if (data) {
      return data.items.map((val, index) => {
        return (
          <tr key={val.id}>
            <td>{index + 1}</td>
            <td>{val.name}</td>
            <td>
              <img src={val.image} alt={`${val.name}.jpg`} height="100px" />
            </td>
            <td>Rp. {val.price.toLocaleString()}</td>
            <td>{val.qty}</td>
          </tr>
        );
      });
    }
  };

  render() {
    const { modalOpen, toggle } = this.props;
    return (
      <div>
        <Modal isOpen={modalOpen}>
          <ModalHeader>Items</ModalHeader>
          <ModalBody>
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Image</th>
                  <th>Price</th>
                  <th>Qty</th>
                </tr>
              </thead>
              <tbody>{this.renderItems()}</tbody>
            </Table>
          </ModalBody>
          <ModalFooter>
            <Button color="info" onClick={toggle}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default HistoryModal;
