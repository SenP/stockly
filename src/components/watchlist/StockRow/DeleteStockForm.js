import React, { Component } from "react";
import { instanceOf, func, bool } from "prop-types";
import { Button } from "react-bootstrap";

import { Stock, Watchlist } from "../../../services";
import Message from "../../common/Message";

const msgClasses = {
  error: "msg text-center text-danger",
  info: "msg text-center text-info"
};

export default class DeleteStockForm extends Component {
  static propTypes = {
    stock: instanceOf(Stock).isRequired,
    watchlist: instanceOf(Watchlist).isRequired,
    onDelete: func.isRequired,
    onClose: func.isRequired,
    saving: bool
  };

  state = {
    msg: null,
    msgClass: null,
    saving: false
  };

  componentWillMount() {
    this.setCompState(this.props);
  }

  componentWillReceiveProps(newProps) {
    this.setCompState(newProps);
  }

  setCompState = ({ saving, stock }) => {
    let msg = saving
      ? `Deleting ${stock.name}...please wait.`
      : `  Delete '${this.props.stock.name}' ?  `;
    this.setState(() => ({
      msg,
      msgClass: saving ? msgClasses.info : msgClasses.error,
      saving
    }));
  };

  submitForm = evt => {
    let { stock, watchlist, onDelete } = this.props;
    onDelete(stock, watchlist);
  };

  closeForm = () => {
    let { stock, onClose } = this.props;
    this.setState(() => ({
      stock: Object.assign(new Stock(), stock),
      msg: "",
      msgClass: ""
    }));
    onClose();
  };

  render = () => {
    let { stock } = this.props;

    return (
      <tr>
        <td>
          {stock.code}
        </td>
        <td colSpan="8" style={{ textAlign: "center" }}>
          <span style={{ textAlign: "center", marginTop: "10px" }}>
            <Message msgtext={this.state.msg} msgclass={this.state.msgClass} />
          </span>
        </td>
        <td>
          <span>
            <Button
              bsSize="xsmall"
              bsStyle="danger"
              style={{ marginRight: "10px" }}
              onClick={this.submitForm}
            >
              Yes
            </Button>
            <Button bsSize="xsmall" bsStyle="default" onClick={this.closeForm}>
              No
            </Button>
          </span>
        </td>
      </tr>
    );
  };
}
