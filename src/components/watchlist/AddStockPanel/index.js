import React, { Component } from "react";
import { instanceOf, object } from "prop-types";
import { Button } from "react-bootstrap";
// redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import selectStockOp from "../../../redux/selectors/selectStockOp";

import { Stock, Watchlist, WatchlistService } from "../../../services";
import * as watchlistActions from "../../../redux/actions/watchlistActions";
import AddStockForm from "./AddStockForm";

class AddStockPanel extends Component {
  static propTypes = {
    watchlist: instanceOf(Watchlist).isRequired,
    addStockOp: object
  };

  state = {
    watchlist: this.props.watchlist,
    adding: false,
    newStock: null,
    saving: false,
    error: null
  };

  componentDidMount() {
    this.setCompState(this.props);
  }

  componentWillReceiveProps(newProps) {
    this.setCompState(newProps);
  }

  resetOpStatus = () => {
    let { newStock, watchlist } = this.state;
    let { removeAsyncOp } = this.props.actions;
    removeAsyncOp(newStock, watchlist, "ADD");
  };

  setCompState = props => {
    let { addStockOp, watchlist } = props;
    if (addStockOp) {
      let newStock = addStockOp.stock;
      let saving = addStockOp.status === "pending" ? true : false;
      let error = addStockOp.error;
      this.setState(() => ({
        watchlist,
        newStock,
        adding: true,
        saving,
        error
      }));
    } else {
      this.setState(prevState => ({
        watchlist,
        adding: false,
        newStock: new Stock(),
        saving: false,
        error: null
      }));
    }
  };

  onAddClick = () => {
    this.setState(
      () => ({
        adding: true
      }),
      () =>
        this.props.actions.initAsyncOp(new Stock(), this.state.watchlist, "ADD")
    );
  };

  onSave = stock => {
    this.setState(
      () => ({
        newStock: stock
      }),
      () => this.props.actions.addStock(stock, this.state.watchlist)
    );
  };

  onValidate = stock => {
    return WatchlistService.validateStock(this.state.watchlist, stock, true);
  };

  handleChange = newStock => {
    this.props.actions.updateAsyncOp(this.state.watchlist, newStock, "ADD");
  };

  onCancel = () => {
    this.setState({
      adding: false,
      saving: false,
      error: null,
      newStock: new Stock()
    });
    this.resetOpStatus();
  };

  render = () => {
    let { adding, saving, error, newStock } = this.state;

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
            stock={newStock}
            saving={saving}
            error={error}
            onChange={this.handleChange}
            onValidate={this.onValidate}
            onSave={this.onSave}
            onClose={this.onCancel}
          />}
      </div>
    );
  };
}

function mapStateToProps(state, ownProps) {
  return {
    addStockOp: selectStockOp(state, null, ownProps.watchlist, "ADD")
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(watchlistActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddStockPanel);
