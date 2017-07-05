import React, { Component } from "react";
import { instanceOf } from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
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

import {
  Stock,
  Watchlist,
  QuotesService,
  WatchlistService
} from "../../services";
import * as watchlistActions from "../../redux/actions/watchlistActions";
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

class AddStockForm extends Component {
  static propTypes = {
    watchlist: instanceOf(Watchlist)
  };
  state = {
    stock: new Stock(),
    isAdding: false,
    suggestions: [],
    msg: "",
    msgClass: ""
  };

  componentWillReceiveProps(newProps) {
    let { stock } = this.state;
    let watchlist = newProps.watchlist;
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

  handleChange = evt => {
    let { name: fieldName, value } = evt.target;
    this.setState(prevState => ({
      stock: Object.assign(new Stock(), prevState.stock, { [fieldName]: value })
    }));
  };

  addStock = () => {
    this.setState({ stock: new Stock(), isAdding: true });
  };

  submitForm = evt => {
    let { watchlist, actions } = this.props;
    let { stock } = this.state;
    this.setState(() => ({
      msg: "Saving...please wait.",
      msgClass: msgClasses.info
    }));
    let valid = WatchlistService.validateStock(watchlist, stock, true);
    if (valid.status === "error") {
      this.setState({
        msg: valid.msg,
        msgClass: msgClasses.error
      });
      return;
    }
    actions.addStock(stock, watchlist);    
  };

  resetForm = () => {
    this.setState(() => ({
      stock: new Stock(),
      isAdding: false,
      msg: "",
      msgClass: ""
    }));
  };

  render = () => {
    let { isAdding, suggestions, msg, msgClass } = this.state;
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

    const AddButton = (
      <div className="text-right">
        <Button
          bsStyle="success"
          onClick={this.addStock}
          style={{ marginBottom: "10px" }}
        >
          Add Stock
        </Button>
      </div>
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
      <div>
        {!isAdding && AddButton}
        {isAdding &&
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
                  style={{ margin: "0px 5px" }}
                >
                  Submit
                </Button>
                <Button
                  type="button"
                  bsStyle="danger"
                  bsSize="small"
                  onClick={this.resetForm}
                >
                  Cancel
                </Button>
              </span>
              <div style={{ textAlign: "center", marginTop: "10px" }}>
                <Message msgtext={msg} msgclass={msgClass} />
              </div>
            </Form>
          </Panel>}
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddStockForm);
