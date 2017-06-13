import React, { Component } from "react";
import { Button } from "react-bootstrap";
import FontAwesome from "react-fontawesome";
import { instanceOf, func } from "prop-types";
import { Stock as StockModel } from "../../services";
import EditStockForm from "./EditStockForm";

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
    console.log('saved', res);
    if (res) {
      this.setState({ editing: false });
    }
  };

  onDeleteClick = () => {
    this.setState({ deleting: true });
  };

  onEditCancel = () => {
    this.setState({ editing: false });
  };

  render() {
    let { stock, onEdit, onDelete } = this.props;
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
              onClick={this.onDeleteClick}
            >
              <FontAwesome name="trash-o" />
            </Button>
          </span>
        </td>
      </tr>
    );

    return (
      (!editing && !deleting && view) ||
      (editing &&
        <EditStockForm
          stock={stock}
          submitFn={this.onEditSubmit}
          cancelFn={this.onEditCancel}
        />)
    );
  }
}
