import React, { Component } from "react";
import { instanceOf, func, bool, string } from "prop-types";
import {
  Panel,
  Button,
  Form,
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
import { Stock, QuotesService } from "../../../services";
import Autosuggest from "react-autosuggest";
import "./autoSuggestStyles.css";
import Message from "../../common/Message";

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
    stock: instanceOf(Stock),
    onValidate: func.isRequired,
    onSave: func.isRequired,
    onClose: func.isRequired,
    saving: bool,
    error: string
  };

  state = {
    stock: Object.assign(new Stock(), this.props.stock),
    suggestions: [],
    msg: "",
    msgClass: "",
    saving: false
  };

  componentWillMount() {
    this.setCompState(this.props);
  }

  componentWillReceiveProps(newProps) {
    this.setCompState(newProps);
  }

  setCompState = props => {
    let { saving, stock, error = null } = props;
    let msg = saving ? "Saving...please wait." : error;
    let msgClass = saving ? msgClasses.info : msgClasses.error;

    this.setState(() => ({
      stock: Object.assign(new Stock(), stock),
      msg,
      msgClass,
      saving
    }));
  };

  onStockSelect = (event, { newValue }) => {
    let tickers = getSuggestions(newValue, 3, true);
    let name = tickers.length > 0 ? tickers[0].name : "";
    this.setState(prevState => ({
      stock: Object.assign(new Stock(), prevState.stock, {
        code: newValue,
        name
      })
    }));
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({ suggestions: getSuggestions(value) });
  };

  onSuggestionsClearRequested = () => {
    this.setState({ suggestions: [] });
  };

  handleChange = ({ target }) => {
    this.setState(prevState => ({
      stock: Object.assign(new Stock(), prevState.stock, {
        [target.name]: target.value
      })
    }));
  };

  submitForm = evt => {
    let { stock } = this.state;
    let valid = this.props.onValidate(stock, true);
    if (valid.status === "error") {
      this.setState({
        msg: valid.msg,
        msgClass: msgClasses.error
      });
      return;
    }
    this.props.onSave(stock);
  };

  resetForm = () => {
    this.setState(() => ({
      stock: new Stock(),
      msg: "",
      msgClass: ""
    }));
    this.props.onClose();
  };

  render = () => {
    let { suggestions, msg, msgClass, saving } = this.state;
    let {
      code = "",
      name = "",
      unitsOwned = 0,
      avgPrice = 0
    } = this.state.stock;
    const formTitle = (
      <span style={{ textAlign: "center" }}>
        <h4>Add Stock</h4>
      </span>
    );

    const inputProps = {
      placeholder: "Enter stock code...",
      value: code,
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
            <ControlLabel>Stock: </ControlLabel>{" "}
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              inputProps={inputProps}
              renderInputComponent={renderInputComponent}
            />
            <span>
              <em>
                {name}
              </em>
            </span>
          </FormGroup>
          {Spacing}

          <FormGroup>
            <ControlLabel>Units Owned: </ControlLabel>{" "}
            <FormControl
              type="text"
              name="unitsOwned"
              bsSize="small"
              value={unitsOwned}
              onChange={this.handleChange}
            />
          </FormGroup>
          {Spacing}

          <FormGroup>
            <ControlLabel> Buy Price: $ </ControlLabel>{" "}
            <FormControl
              type="text"
              name="avgPrice"
              bsSize="small"
              value={avgPrice}
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
              disabled={saving}
              style={{ margin: "0px 5px" }}
            >
              Submit
            </Button>
            <Button
              type="button"
              bsStyle="danger"
              bsSize="small"
              onClick={this.resetForm}
              disabled={saving}
            >
              Cancel
            </Button>
          </span>
          <div style={{ textAlign: "center", marginTop: "10px" }}>
            <Message msgtext={msg} msgclass={msgClass} />
          </div>
        </Form>
      </Panel>
    );
  };
}
