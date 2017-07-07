import React, { Component } from "react";
import { instanceOf, func } from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, FormControl } from "react-bootstrap";
import FontAwesome from "react-fontawesome";

import { Stock, Watchlist, WatchlistService } from "../../services";
import * as watchlistActions from "../../redux/actions/watchlistActions";
import Message from "../common/Message";

const msgClasses = {
  error: "msg text-center text-danger",
  info: "msg text-center text-info"
};

class EditStockForm extends Component {
  static propTypes = {
    stock: instanceOf(Stock).isRequired,
    watchlist: instanceOf(Watchlist).isRequired,
    onClose: func.isRequired
  };

  state = {
    stock: { ...this.props.stock },
    watchlist: this.props.watchlist,
    msg: "",
    msgClass: ""
  };

  componentWillReceiveProps({ stockAsyncOp, actions, stock:newStock }) {
    console.log('new stock:', newStock);
    if (stockAsyncOp && stockAsyncOp.error) {
      this.setState(() => ({
        msg: stockAsyncOp.error,
        msgClass: msgClasses.error
      }));
    }
    if (newStock.unitsOwned === this.state.stock.unitsOwned) {
      this.closeForm();
    }
  }

  handleChange = ({ target }) => {
    this.setState(prevState => ({
      stock: { ...prevState.stock, [target.name]: target.value }
    }));
  };

  submitForm = evt => {
    let { stock, watchlist } = this.state;
    this.setState(() => ({
      msg: "Saving...please wait.",
      msgClass: msgClasses.info
    }));
    let valid = WatchlistService.validateStock(watchlist, stock, false);
    if (valid.status === "error") {
      this.setState({
        msg: valid.msg,
        msgClass: msgClasses.error
      });
      return;
    }
    this.props.actions.editStock(stock, watchlist);
  };

  closeForm = () => {
    let { stock, watchlist, actions, onClose } = this.props;
    this.setState(() => ({
      stock: { ...stock },
      msg: "",
      msgClass: ""
    }));
    actions.removeOpStatus(stock, watchlist);
    onClose();
  };

  componentWillUnmount() {
    console.log("unmounting edit stock form...");
    let { stock, watchlist, actions } = this.props;
    actions.removeOpStatus(stock, watchlist);
  }

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

function mapStateToProps(state, ownProps) {
  console.log(state);
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

export default connect(mapStateToProps, mapDispatchToProps)(EditStockForm);
