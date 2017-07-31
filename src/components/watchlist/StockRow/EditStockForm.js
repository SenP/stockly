import React, { Component } from "react";
import { instanceOf, func, bool, string } from "prop-types";
import { Button, FormControl } from "react-bootstrap";
import FontAwesome from "react-fontawesome";

import { Stock, Watchlist } from "../../../services";
import Message from "../../common/Message";

const msgClasses = {
  error: "msg text-center text-danger",
  info: "msg text-center text-info"
};

export default class EditStockForm extends Component {
  static propTypes = {
    stock: instanceOf(Stock).isRequired,
    watchlist: instanceOf(Watchlist).isRequired,
    onChange: func.isRequired,
    onValidate: func.isRequired,
    onSave: func.isRequired,
    onClose: func.isRequired,
    saving: bool,
    error: string
  };

  static defaultProps = {
    saving: false,
    error: null,
    onSave: () => {},
    onClose: () => {}
  };

  state = {
    stock: Object.assign(new Stock(), this.props.stock),
    watchlist: this.props.watchlist,
    msg: "",
    msgClass: "",
    saving: false
  };

  componentWillMount() {
    let { saving, stock, watchlist, error = null } = this.props;
    let msg = saving ? "Saving...please wait." : error;
    let msgClass = saving ? msgClasses.info : msgClasses.error;

    this.setState(() => ({
      stock: Object.assign(new Stock(), stock),
      watchlist,
      msg,
      msgClass,
      saving
    }));
  }

  componentWillReceiveProps({ saving = false, error = null }) {
    this.setState(() => ({
      msg: saving ? "Saving...please wait." : error,
      msgClass: saving ? msgClasses.info : msgClasses.error,
      saving
    }));
  }

  handleChange = ({ target }) => {
    this.setState(
      prevState => ({
        stock: Object.assign(new Stock(), prevState.stock, {
          [target.name]: target.value.trim()
        })
      }),
      () => this.props.onChange(this.state.stock)
    );
  };

  submitForm = evt => {
    let { stock } = this.state;
    let valid = this.props.onValidate(stock);
    if (valid.status === "error") {
      this.setState({
        msg: valid.msg,
        msgClass: msgClasses.error
      });
      return;
    }
    this.props.onSave(stock);
  };

  closeForm = () => {
    let { stock, onClose } = this.props;
    this.setState(() => ({
      stock: Object.assign(new Stock(), stock),
      msg: "",
      msgClass: ""
    }));
    onClose();
  };

  render = () => {
    let { stock, msg, msgClass, saving } = this.state;

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
            maxLength={9}
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
            maxLength={8}
          />
        </td>
        <td colSpan="7">
          <span className="center-block">
            <Button
              bsSize="small"
              bsStyle="success"
              style={{ marginRight: "10px" }}
              onClick={this.submitForm}
              disabled={saving}
            >
              <FontAwesome name="check" />
            </Button>

            <Button
              bsSize="small"
              bsStyle="danger"
              onClick={this.closeForm}
              disabled={saving}
            >
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
