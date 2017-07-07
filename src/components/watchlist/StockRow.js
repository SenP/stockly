import React, { Component } from "react";
import { instanceOf } from "prop-types";

import { Stock, Watchlist } from "../../services";
import StockView from "./StockView";
import EditStockForm from "./EditStockForm";
import DeleteStockForm from "./DeleteStockForm";

export default class StockRow extends Component {
  static propTypes = {
    stock: instanceOf(Stock).isRequired,
    watchlist: instanceOf(Watchlist).isRequired
  };

  state = {
    stock: this.props.stock,
    watchlist: this.props.watchlist,
    editing: false,
    deleting: false
  };

  componentWillReceiveProps(newProps) {
    this.setState(() => ({
      stock: newProps.stock,
      watchlist: newProps.watchlist
    }));
  }

  onEditClick = () => {
    this.setState({
      editing: true
    });
  };

  onDeleteClick = stk => {
    this.setState({ deleting: true });
  };

  onCancel = () => {
    this.setState({ editing: false, deleting: false });
  };

  render() {
    let { stock, watchlist, editing, deleting } = this.state;

    return (
      (!editing &&
        !deleting &&
        <StockView
          stock={stock}
          onEdit={this.onEditClick}
          onDelete={this.onDeleteClick}
        />) ||
      (editing &&
        <EditStockForm
          stock={stock}
          watchlist={watchlist}
          onClose={this.onCancel}
        />) ||
      (deleting &&
        <DeleteStockForm
          stock={stock}
          watchlist={watchlist}
          onClose={this.onCancel}
        />)
    );
  }
}
