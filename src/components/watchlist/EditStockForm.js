import React, { Component } from "react";
import { instanceOf, func } from "prop-types";
import {
  Panel,
  Button,
  Form,
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
import FontAwesome from "react-fontawesome";

import { Stock, QuotesService } from "../../services";

export default class EditStockForm extends Component {
  static propTypes = {
    stock: instanceOf(Stock).isRequired,
    submitFn: func.isRequired,
    cancelFn: func.isRequired
  };

  state = {
    ...Object.assign({}, this.props.stock)
  };

  handleChange = evt => {
    let { name: fieldName, value } = evt.target;
    this.setState(() => ({ [fieldName]: value }));
  };

  submitForm = evt => {
    evt.preventDefault();
    this.props.submitFn(this.state);
  };

  cancelForm = evt => {
    this.props.cancelFn();
  };

  render = () => {
    let stock = this.props.stock;
    return (
      <tr>        
          <td>
            {stock.code}
          </td>
          <td>
            <FormGroup>
              <FormControl
                type="text"
                name="unitsOwned"
                bsSize="small"
                value={this.state.unitsOwned}
                onChange={this.handleChange}
              />
            </FormGroup>
          </td>
          <td>
            <FormGroup>
              <FormControl
                type="text"
                name="avgPrice"
                bsSize="small"
                value={this.state.avgPrice}
                onChange={this.handleChange}
              />
            </FormGroup>
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
                bsStyle="success"
                style={{ marginRight: "10px" }}
                onClick={this.submitForm}
              >
                <FontAwesome name="check" />
              </Button>
              <Button
                bsSize="xsmall"
                bsStyle="danger"
                onClick={this.cancelForm}
              >
                <FontAwesome name="close" />
              </Button>
            </span>
          </td>
      </tr>
    );
  };
}
