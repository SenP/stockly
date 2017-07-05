import React, { Component } from "react";
import { instanceOf, bool, func } from "prop-types";
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
    stock: Object.assign({}, this.props.stock),
    watchlist: this.props.watchlist,
    msg: "",
    msgClass: ""
  };

  componentWillReceiveProps(newProps) {
    let { stock, watchlist } = this.state;    
    let [asyncOp] = newProps.stocksAsyncOp.filter(
      stockOp =>
        stockOp.stock.code === stock.code &&
        stockOp.watchlist.id === watchlist.id &&
        stockOp.op === "SAVE"
    );
    if (asyncOp && asyncOp.status === "complete") {
      if (asyncOp.error) {
        this.setState(() => ({
          msg: asyncOp.error,
          msgClass: msgClasses.error
        }));
      } else {
        this.props.actions.removeOpStatus(stock, watchlist);
        this.resetForm();
      }
    }
  }

  handleChange = evt => {
    let { name: fieldName, value } = evt.target;
    this.setState(prevState => ({
      stock: Object.assign(new Stock(), prevState.stock, { [fieldName]: value })
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

  resetForm = () => {
    this.setState(() => ({
      stock: Object.assign({}, this.props.stock),
      msg: "",
      msgClass: ""
    }));
    this.props.onClose();
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
            <Button bsSize="small" bsStyle="danger" onClick={this.resetForm}>
              <FontAwesome name="close" />
            </Button>
          </span>
          <span style={{ textAlign: "center", marginTop: "10px" }}>
            <Message msgtext={msg} msgclass={msgClass} />
          </span>
        </td>
      </tr>
    );
  };
}

function mapStateToProps(state, ownProps) {
  return {
    stocksAsyncOp: state.stocksAsyncOp
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(watchlistActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditStockForm);
