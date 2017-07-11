import React, { Component } from "react";
import { instanceOf, func, bool } from "prop-types";

import { Button, FormControl } from "react-bootstrap";
import FontAwesome from "react-fontawesome";

import { Stock, Watchlist, WatchlistService } from "../../services";
import * as watchlistActions from "../../redux/actions/watchlistActions";
import Message from "../common/Message";

const msgClasses = {
  error: "msg text-center text-danger",
  info: "msg text-center text-info"
};

export default class EditStockForm extends Component {
  static propTypes = {
    stock: instanceOf(Stock).isRequired,
    watchlist: instanceOf(Watchlist).isRequired,
    onClose: func.isRequired,
    saving: bool
  };

  state = {
    stock: { ...this.props.stock },
    watchlist: this.props.watchlist,
    msg: "",
    msgClass: "",
    saving: this.props.saving || false
  };

  componentWillMount() {
    let { saving, stock: newStock, watchlist: newWatchlist } = this.props;
    console.log("state:", this.state);
    if (saving) {
      this.setState(() => ({
        stock: { ...this.props.stock },
        watchlist: this.props.watchlist,
        msg: "Saving...please wait.",
        msgClass: msgClasses.info
      }));
    } else {
      this.setState(() => ({
        stock: { ...this.props.stock },
        watchlist: this.props.watchlist,
        saving: false,
        msg: null,
        msgClass: null
      }));
    }
  }

  componentWillReceiveProps({
    saving,
    stock: newStock,
    watchlist: newWatchlist
  }) {
    console.log("state:", this.state);
    if (saving) {
      this.setState(() => ({
        msg: "Saving...please wait.",
        msgClass: msgClasses.info
      }));
    }
  }

  handleChange = ({ target }) => {
    this.setState(prevState => ({
      stock: { ...prevState.stock, [target.name]: target.value }
    }));
  };

  submitForm = evt => {
    let { stock, watchlist } = this.state;
    let valid = WatchlistService.validateStock(watchlist, stock, false);
    if (valid.status === "error") {
      this.setState({
        msg: valid.msg,
        msgClass: msgClasses.error
      });
      return;
    }
    this.props.onSave(stock, watchlist);
  };

  closeForm = () => {
    let { stock, watchlist, actions, onClose } = this.props;
    this.setState(() => ({
      stock: { ...stock },
      msg: "",
      msgClass: ""
    }));
    onClose();
  };

  render = () => {
    let { stock, msg, msgClass } = this.state;

    return (
      <tr>
        <td>
          {stock.code}
        </td>
        <td className="number-field">
          <FormControl
            type="text"
            name="unitsOwned"
            bsSize="small"
            value={stock.unitsOwned}
            onChange={this.handleChange}
            autoFocus
          />
        </td>
        <td className="number-field">
          <FormControl
            type="text"
            name="avgPrice"
            bsSize="small"
            value={stock.avgPrice}
            onChange={this.handleChange}
          />
        </td>
        <td colSpan="7">
          <span className="center-block">
            <Button
              bsSize="small"
              bsStyle="success"
              style={{ marginRight: "10px" }}
              onClick={this.submitForm}
            >
              <FontAwesome name="check" />
            </Button>
            <Button bsSize="small" bsStyle="danger" onClick={this.closeForm}>
              <FontAwesome name="close" />
            </Button>
            <span style={{ textAlign: "center", marginTop: "10px" }}>
              <Message msgtext={msg} msgclass={msgClass} />
            </span>
          </span>
        </td>
      </tr>
    );
  };
}
