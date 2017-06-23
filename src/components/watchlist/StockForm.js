import React, { Component } from "react";
import { instanceOf, func, bool } from "prop-types";
import { Button, FormControl } from "react-bootstrap";
import FontAwesome from "react-fontawesome";

import { Stock } from "../../services";
import Message from "../common/Message";

const msgClasses = {
  error: "msg text-center text-danger",
  info: "msg text-center text-info"
};

export default class StockForm extends Component {
  static propTypes = {
    stock: instanceOf(Stock).isRequired,
    isEditing: bool,
    submitFn: func.isRequired,
    cancelFn: func.isRequired
  };

  static defaultProps = {
    isEditing: true
  };

  state = {
    ...Object.assign({}, this.props.stock),
    msg: "",
    msgClass: ""
  };

  handleChange = evt => {
    let { name: fieldName, value } = evt.target;
    this.setState(() => ({ [fieldName]: value }));
  };

  submitForm = evt => {
    let msg = this.props.isEditing
      ? "Saving...please wait."
      : "Deleting...please wait.";

    this.setState(prevState => ({
      msg,
      msgClass: msgClasses.info
    }));
    let result = this.props.submitFn(this.state);
    if (result.status === "error") {
      this.setState({
        msg: result.msg,
        msgClass: msgClasses.error
      });
    } else {
      this.setState({
        msg: null,
        msgClass: ""
      });
    }
  };

  cancelForm = evt => {
    this.props.cancelFn();
  };

  render = () => {
    let { stock, isEditing } = this.props;

    const editStockForm = (
      <tr>
        <td>
          {stock.code}
        </td>
        <td className="number-field">
          <FormControl
            type="text"
            name="unitsOwned"
            bsSize="small"
            value={this.state.unitsOwned}
            onChange={this.handleChange}
            autoFocus
          />
        </td>
        <td className="number-field">
          <FormControl
            type="text"
            name="avgPrice"
            bsSize="small"
            value={this.state.avgPrice}
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
            <Button bsSize="small" bsStyle="danger" onClick={this.cancelForm}>
              <FontAwesome name="close" />
            </Button>
            <Message msgtext={this.state.msg} msgclass={this.state.msgClass} />
          </span>
        </td>
      </tr>
    );

    const deleteStockForm = (
      <tr>
        <td>
          {stock.code}
        </td>
        <td colSpan="8" style={{ textAlign: "right" }}>
          <span className="text-danger">
            <strong>{`Delete '${stock.name}' ?  `} </strong>
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
              {" "}
              Yes
            </Button>
            <Button bsSize="xsmall" bsStyle="default" onClick={this.cancelForm}>
              No
            </Button>
            <Message msgtext={this.state.msg} msgclass={this.state.msgClass} />
          </span>
        </td>
      </tr>
    );

    return (isEditing && editStockForm) || deleteStockForm;
  };
}
