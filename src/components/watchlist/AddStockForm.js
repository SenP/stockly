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
import Autosuggest from "react-autosuggest";
import "./autoSuggestStyles.css";

import { Stock, QuotesService } from "../../services";
import Message from "../common/Message";

const msgClasses = {
  error: "msg text-center text-danger",
  info: "msg text-center text-info"
};

const getSuggestions = (value, minLength = 0, exact = false) => {
  const inputValue = exact ? value : value.trim().toLowerCase();
  const inputLength = inputValue.length;
  return inputLength <= minLength
    ? []
    : QuotesService.searchTickers(inputValue, exact);
};

const getSuggestionValue = suggestion => suggestion.code;

const renderSuggestion = ticker =>
  <div>
    {ticker.name} <br /> (<em> {ticker.code} </em>)
  </div>;

export default class AddStockForm extends Component {
  static propTypes = {
    stock: instanceOf(Stock).isRequired,
    submitFn: func.isRequired,
    cancelFn: func.isRequired
  };

  state = {
    ...Object.assign({}, this.props.stock),
    suggestions: [],
    msg: "",
    msgClass: ""
  };

  onStockSelect = (event, { newValue }) => {
    let tickers = getSuggestions(newValue, 3, true);
    let name = tickers.length > 0 ? tickers[0].name : "";
    this.setState(() => ({
      code: newValue,
      name
    }));
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  handleChange = evt => {
    let { name: fieldName, value } = evt.target;
    this.setState(() => ({ [fieldName]: value }));
  };

  submitForm = evt => {
    this.setState(prevState => ({
      msg: "Saving...please wait.",
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

  render = () => {
    const formTitle = (
      <span style={{ textAlign: "center" }}>
        <h4>
          {!this.state.id ? "Add Stock" : "Edit Stock"}
        </h4>
      </span>
    );

    const inputProps = {
      placeholder: "Enter stock code...",
      value: this.state.code,
      onChange: this.onStockSelect,
      className: "form-control input-sm"
    };

    const renderInputComponent = inputProps =>
      <div>
        <input type="text" name="code" {...inputProps} autoFocus />
      </div>;

    const Spacing = <span>&nbsp;&nbsp;&nbsp;</span>;

    return (
      <Panel header={formTitle} style={{ marginBottom: "5px" }}>
        <Form inline>
          <FormGroup>
            <ControlLabel>Stock: </ControlLabel>
            {" "}
            <Autosuggest
              suggestions={this.state.suggestions}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              inputProps={inputProps}
              renderInputComponent={renderInputComponent}              
            />
            <span>
              {" "}<em> {this.state.name} </em>{" "}
            </span>
          </FormGroup>
          {Spacing}

          <FormGroup>
            <ControlLabel>Units Owned: </ControlLabel>
            {" "}
            <FormControl
              type="text"
              name="unitsOwned"
              bsSize="small"
              value={this.state.unitsOwned}
              onChange={this.handleChange}
            />
          </FormGroup>
          {Spacing}

          <FormGroup>
            <ControlLabel> Buy Price: $ </ControlLabel>
            {" "}
            <FormControl
              type="text"
              name="avgPrice"
              bsSize="small"
              value={this.state.avgPrice}
              onChange={this.handleChange}
            />
          </FormGroup>
          {Spacing}

          <span>
            <Button
              type="button"
              bsStyle="success"
              bsSize="small"
              onClick={this.submitForm}
              style={{ margin: "0px 5px" }}
            >
              Submit
            </Button>
            <Button
              type="button"
              bsStyle="danger"
              bsSize="small"
              onClick={this.props.cancelFn}
            >
              Cancel
            </Button>
          </span>
          <div style={{ textAlign: "center", marginTop: "10px" }}>
            <Message msgtext={this.state.msg} msgclass={this.state.msgClass} />
          </div>
        </Form>
      </Panel>
    );
  };
}
