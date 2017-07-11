import React, { Component } from "react";
import { instanceOf } from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Stock, Watchlist } from "../../services";
import StockView from "./StockView";
import EditStockForm from "./EditStockForm";
import DeleteStockForm from "./DeleteStockForm";
import * as watchlistActions from "../../redux/actions/watchlistActions";

class StockRow extends Component {
  static propTypes = {
    stock: instanceOf(Stock).isRequired,
    watchlist: instanceOf(Watchlist).isRequired
  };

  state = {
    stock: this.props.stock,
    watchlist: this.props.watchlist,
    editing: false,
    deleting: false,
    asyncOp: null
  };

  //need to do the same while props update
  componentWillMount() {
    let { stockAsyncOp, stock: newStock, watchlist: newWatchlist } = this.props;
    if (stockAsyncOp && stockAsyncOp.status === "pending") {
      let editing = stockAsyncOp.op === "SAVE" ? true : false;
      this.setState(() => ({
        stock: newStock,
        watchlist: newWatchlist,
        editing,
        deleting: !editing,
        saving: true
      }));
    } else {
      this.setState(() => ({
        stock: newStock,
        watchlist: newWatchlist,
        editing: false,
        deleting: false,
        saving: false
      }));
    }
  }

  onEditClick = () => {
    this.setState({
      editing: true
    });
  };

  onSave = (stock, watchlist) => {
    this.props.actions.editStock(stock, watchlist);
  };

  onDeleteClick = stk => {
    this.setState({ deleting: true });
  };

  onDelete = (stock, watchlist) => {
    this.props.actions.deleteStock(stock, watchlist);
  };

  onCancel = () => {
    this.setState({ editing: false, deleting: false });
  };

  render() {
    let { stock, watchlist, editing, deleting, saving } = this.state;

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
          saving={saving}
          onSave={this.onSave}
          onClose={this.onCancel}
        />) ||
      (deleting &&
        <DeleteStockForm
          stock={stock}
          watchlist={watchlist}
          saving={saving}
          onDelete={this.onDelete}
          onClose={this.onCancel}
        />)
    );
  }
}

function mapStateToProps(state, ownProps) {
  let stockAsyncOp = state.stocksAsyncOp
    ? state.stocksAsyncOp.filter(
        stockOp =>
          stockOp.stock.code === ownProps.stock.code &&
          stockOp.watchlist.id === ownProps.watchlist.id &&
          stockOp.op === "SAVE"
      )[0]
    : null;
  return {
    stockAsyncOp
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(watchlistActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StockRow);
