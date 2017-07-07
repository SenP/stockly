import React, { Component } from "react";
import { instanceOf, func } from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "react-bootstrap";

import { Stock, Watchlist } from "../../services";
import * as watchlistActions from "../../redux/actions/watchlistActions";
import Message from "../common/Message";

const msgClasses = {
  error: "msg text-center text-danger",
  info: "msg text-center text-info"
};

class DeleteStockForm extends Component {
  static propTypes = {
    stock: instanceOf(Stock).isRequired,
    watchlist: instanceOf(Watchlist).isRequired,
    onClose: func.isRequired
  };

  state = {
    msg: `  Delete '${this.props.stock.name}' ?  `,
    msgClass: msgClasses.error
  };

  componentWillReceiveProps({ stock, watchlist, stocksAsyncOp, actions }) {
    let [asyncOp] = stocksAsyncOp.filter(
      stockOp =>
        stockOp.stock.code === stock.code &&
        stockOp.watchlist.id === watchlist.id &&
        stockOp.op === "DELETE"
    );
    if (asyncOp && asyncOp.error) {
      this.setState(() => ({
        msg: asyncOp.error,
        msgClass: msgClasses.error
      }));
    }
  }

  submitForm = evt => {
    let { stock, watchlist } = this.props;
    this.setState(() => ({
      msg: `Deleting ${stock.name}...please wait.`,
      msgClass: msgClasses.info
    }));
    this.props.actions.deleteStock(stock, watchlist);
  };

  closeForm = () => {
    this.setState(() => ({
      stock: { ...this.props.stock },
      msg: "",
      msgClass: ""
    }));
    this.props.onClose();
  };

  render = () => {
    let { stock } = this.props;

    return (
      <tr>
        <td>
          {stock.code}
        </td>
        <td colSpan="8" style={{ textAlign: "center" }}>
          <span style={{ textAlign: "center", marginTop: "10px" }}>
            <Message msgtext={this.state.msg} msgclass={this.state.msgClass} />
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
              Yes
            </Button>
            <Button bsSize="xsmall" bsStyle="default" onClick={this.closeForm}>
              No
            </Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(DeleteStockForm);
