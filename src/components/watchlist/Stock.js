import React, { Component } from "react";
import { Button } from "react-bootstrap";
import FontAwesome from "react-fontawesome";
import { instanceOf, func } from "prop-types";
import { Stock as StockModel } from "../../services";
import StockForm from "./StockForm";

export default class Stock extends Component {
  static propTypes = {
    stock: instanceOf(StockModel).isRequired,
    onEdit: func.isRequired,
    onDelete: func.isRequired
  };

  state = { editing: false, deleting: false };

  onEditClick = () => {
    this.setState({ editing: true });
  };

  onEditSubmit = stk => {
    let res = this.props.onEdit(stk);
    if (res.status === "success") {
      this.setState({ editing: false });
    }
    return res;
  };

  onDeleteClick = stk => {
    this.setState({ deleting: true });
  };

  onDeleteSubmit = stk => {
    let res = this.props.onDelete(stk);
    if (res.status === "success") {
      this.setState({ deleting: false });
    }
    return res;
  };

  onCancel = () => {
    this.setState({ editing: false, deleting: false });
  };

  render() {
    let { stock } = this.props;
    let { editing, deleting } = this.state;
    let view = (
      <tr>
        <td>
          {stock.code}
        </td>
        <td className="number-field"> {parseInt(stock.unitsOwned, 10)} </td>
        <td className="number-field">
          {parseFloat(stock.avgPrice).toFixed(2)}
        </td>
        <td className="number-field">
          {parseFloat(stock.lastPrice).toFixed(2)}
        </td>
        <td className="number-field">
          {parseFloat(stock.change).toFixed(2)}
        </td>
        <td className="number-field">
          {parseFloat(stock.percentChange).toFixed(2)}
        </td>
        <td className="number-field">
          {parseFloat(stock.marketValue).toFixed(2)}
        </td>
        <td className="number-field">
          {parseFloat(stock.dayChange).toFixed(2)}
        </td>
        <td className="number-field">
          {parseFloat(stock.netPnL).toFixed(2)}
        </td>
        <td>
          <span className="center-block">
            <Button
              bsSize="xsmall"
              bsStyle="warning"
              onClick={this.onEditClick}
              style={{ marginRight: "10px" }}
            >
              <FontAwesome name="pencil-square-o" />
            </Button>
            <Button
              bsSize="xsmall"
              bsStyle="danger"
              onClick={() => this.onDeleteClick(stock)}
            >
              <FontAwesome name="trash-o" />
            </Button>
          </span>
        </td>
      </tr>
    );

    return (
      (!editing && !deleting && view) ||
      <StockForm
        stock={stock}
        isEditing={editing}
        submitFn={editing ? this.onEditSubmit : this.onDeleteSubmit}
        cancelFn={this.onCancel}
      />
    );
  }
}
