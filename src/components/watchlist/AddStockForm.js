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

const tickers = QuotesService.getTickers();

const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  return inputLength === 0
    ? []
    : tickers.filter(
        ticker =>
          ticker.name.toLowerCase().slice(0, inputLength) === inputValue ||
          ticker.code.toLowerCase().slice(0, inputLength) === inputValue
      );
};

const getSuggestionValue = suggestion => suggestion.code;

const renderSuggestion = ticker => `${ticker.name} (${ticker.code})`;

export default class AddStockForm extends Component {
  static propTypes = {
    stock: instanceOf(Stock).isRequired,
    submitFn: func.isRequired,
    cancelFn: func.isRequired
  };

  state = {
    ...Object.assign({}, this.props.stock),
    suggestions: []
  };

  onStockSelect = (event, { newValue }) => {
    this.setState(() => ({
      code: newValue
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
    evt.preventDefault();
    this.props.submitFn(this.state);
  };

  render = () => {
    const formTitle = (
      <span style={{ textAlign: "center" }}>
        <h4>
          <strong>
            {!this.state.id ? "Add Stock" : "Edit Stock"}
          </strong>
        </h4>
      </span>
    );

    const codeInputProps = {
      placeholder: "Enter stock code...",
      value: this.state.code,
      onChange: this.onStockSelect
    };

    const renderInputComponent = inputProps =>
      <div>
        <FormControl type="text" name="code" bsSize="small" {...inputProps} />
      </div>;

    return (
      <Panel header={formTitle} style={{ marginBottom: "5px" }}>
        <Form inline onSubmit={this.submitForm}>
          <FormGroup>
            <ControlLabel>Stock: </ControlLabel>
            <Autosuggest
              suggestions={this.state.suggestions}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              inputProps={codeInputProps}
              renderInputComponent={renderInputComponent}
            />
          </FormGroup>

          <FormGroup>
            <ControlLabel> &nbsp; Units Owned: </ControlLabel>
            <FormControl
              type="text"
              name="unitsOwned"
              bsSize="small"
              value={this.state.unitsOwned}
              onChange={this.handleChange}
            />
          </FormGroup>

          <FormGroup>
            <ControlLabel> &nbsp; Buy Price: $ </ControlLabel>
            <FormControl
              type="text"
              name="avgPrice"
              bsSize="small"
              value={this.state.avgPrice}
              onChange={this.handleChange}
            />
          </FormGroup>
          <span>
            <Button
              type="submit"
              bsStyle="success"
              bsSize="small"
              disabled={this.state.msg}
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
        </Form>
      </Panel>
    );
    // <label> Stock: </label>
    // 	<template #customItemTemplate let-model="item">
    // 			<h5> {{model.Name}} </h5> <h6><em>Code: {{model.Symbol}} &emsp; Exchange: {{model.Exchange}}</em></h6>
    // 		</template>
    // 	<input
    // 	[(ngModel)]="editedItem.instrument"
    // 			[typeahead]="tickers" (typeaheadOnSelect)="onStockSelect($event)" [typeaheadOptionsLimit]="7"
    // 			[typeaheadItemTemplate]="customItemTemplate" typeaheadOptionField="Symbol"
    // 			[typeaheadMinLength]="0"
    // 			autocomplete="off" required> &nbsp;
    // 	<span><em> {{ selectStkName }} / {{ editedItem.exchange }} </em> </span>
  };
}
