import React, { Component } from "react";
import { instanceOf, array } from "prop-types";
import {
  Button,
} from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import getStockOps from "../../../redux/selectors/getStockOps";
import getStockOp from "../../../redux/selectors/getStockOp";

import {
  Stock,
  Watchlist,
  WatchlistService
} from "../../../services";
import * as watchlistActions from "../../../redux/actions/watchlistActions";
import AddStockForm from "./AddStockForm";

class AddStockPanel extends Component {
  static propTypes = {
    watchlist: instanceOf(Watchlist).isRequired,
    stockOps: array
  };

  state = {
    watchlist: this.props.watchlist,
    adding: false,
    addedStock: null,
    saving: false,
    error: null
  };

  componentDidMount() {
    this.setCompState(this.props);
  }

  componentWillReceiveProps(newProps) {
    this.setCompState(newProps);
  }

  componentWillUnmount() {
    // Cleanup op status
    let { adding, saving } = this.state;
    if (!saving && !adding) {
      // this.resetOpStatus();
    }
  }

  resetOpStatus = () => {
    let { addedStock, watchlist } = this.state;
    let { removeStockOp } = this.props.actions;
    removeStockOp(addedStock, watchlist, "ADD");
  };

  setCompState(props) {
    let { stockOps, watchlist } = props;
    let stockAsyncOp = getStockOp(stockOps, this.state.addedStock, watchlist);
    if (stockAsyncOp) {
      let adding = stockAsyncOp.op === "SAVE" ? true : false;
      let addedStock = adding ? stockAsyncOp.stock : new Stock();
      let saving = stockAsyncOp.status === "pending" ? true : false;
      let error = stockAsyncOp.error;
      this.setState(() => ({
        watchlist,
        addedStock,
        adding,
        saving,
        error
      }));
    } else {
      this.setState(prevState => ({
        watchlist,
        adding: false,
        addedStock: new Stock(),
        saving: false,
        error: null
      }));
    }
  }

  onAddClick = () => {
    this.setState({ adding: true });
  };

  onSave = stock => {
    this.setState(
      () => ({
        addedStock: stock
      }),
      () => this.props.actions.addStock(stock, this.state.watchlist)
    );
  };

  onValidate = (stock, isAdding) => {
    return WatchlistService.validateStock(
      this.state.watchlist,
      stock,
      isAdding
    );
  };

  onCancel = () => {
    this.setState({
      adding: false,
      saving: false,
      error: null,
      addedStock: new Stock()
    });
    this.resetOpStatus();
  };

  render = () => {
    let { adding, saving, error, addedStock } = this.state;

    const AddButton = (
      <div className="text-right">
        <Button
          bsStyle="success"
          onClick={this.onAddClick}
          style={{ marginBottom: "10px" }}
        >
          Add Stock
        </Button>
      </div>
    );

    return (
      <div>
        {!adding && AddButton}
        {adding &&
          <AddStockForm
            stock={addedStock}
            saving={saving}
            error={error}
            onSave={this.onSave}
            onClose={this.onCancel}
            onValidate={this.onValidate}
          />}
      </div>
    );
  };
}

function mapStateToProps(state, ownProps) {
  return {
    stockOps: getStockOps(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(watchlistActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddStockPanel);
