import React, { Component } from "react";
import { instanceOf, bool, func } from "prop-types";
import { Button, FormControl } from "react-bootstrap";
import FontAwesome from "react-fontawesome";

import { Stock, Watchlist, WatchlistService } from "../../services";

const msgClasses = {
  error: "msg text-center text-danger",
  info: "msg text-center text-info"
};

export default class StockForm extends Component {
  static propTypes = {
    stock: instanceOf(Stock).isRequired,
    watchlist: instanceOf(Watchlist).isRequired,
    onClose: func.isRequired
  };

  state = {
    stock: Object.assign({}, this.props.stock),
    msg: "",
    msgClass: ""
  };

  handleChange = evt => {
    let { name: fieldName, value } = evt.target;
    this.setState(prevState => ({
      stock: Object.assign(new Stock(), prevState.stock, { [fieldName]: value })
    }));
  };

  submitForm = evt => {
    let { watchlist, actions } = this.props;
    let { stock } = this.state;
    this.setState(() => ({
      msg: "Saving...please wait.",
      msgClass: msgClasses.info
    }));
    let valid = WatchlistService.validateStock(watchlist, stock, true);
    if (valid.status === "error") {
      this.setState({
        msg: valid.msg,
        msgClass: msgClasses.error
      });
      return;
    }
    actions.editStock(stock, watchlist);    
  };

  resetForm = () => {
    this.setState(() => ({
      stock: Object.assign({}, this.props.stock),
      msg: "",
      msgClass: ""
    }));
    this.props.onClose();
  };

  render = () => {
    let { stock, isEditing } = this.props;

    const editStockForm = (
      <tr>
        <td>
          {stock.code}
        </td>
        <td className="number-field">
          <FormControl
            type="text"
            name="unitsOwned"
            bsSize="small"
            value={this.state.unitsOwned}
            onChange={this.handleChange}
            autoFocus
          />
        </td>
        <td className="number-field">
          <FormControl
            type="text"
            name="avgPrice"
            bsSize="small"
            value={this.state.avgPrice}
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
            <Button bsSize="small" bsStyle="danger" onClick={this.cancelForm}>
              <FontAwesome name="close" />
            </Button>
          </span>
        </td>
      </tr>
    );

    const deleteStockForm = (
      <tr>
        <td>
          {stock.code}
        </td>
        <td colSpan="8" style={{ textAlign: "right" }}>
          <span className="text-danger">
            <strong>
              {`Delete '${stock.name}' ?  `}{" "}
            </strong>
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
              {" "}Yes
            </Button>
            <Button bsSize="xsmall" bsStyle="default" onClick={this.cancelForm}>
              No
            </Button>
          </span>
        </td>
      </tr>
    );

    return (isEditing && editStockForm) || deleteStockForm;
  };
}
