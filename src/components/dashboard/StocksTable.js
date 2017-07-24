import React, { Component } from "react";
import { instanceOf, string } from "prop-types";
import { Panel, Table, FormControl, FormGroup } from "react-bootstrap";
import FontAwesome from "react-fontawesome";

import transformMap from "../../utils/transformMap";
import Colored from "../common/Colored";
import formatCash from "../../utils/formatCash";

export default class StocksTable extends Component {
  static propTypes = {
    stocks: instanceOf(Map),
    title: string,
    orderBy: string.isRequired
  };

  static defaultProps = {
    title: "",
    orderBy: "marketValue"
  };

  state = {
    filteredStocks: [],
    title: this.props.title,
    orderBy: this.props.orderBy,
    numItems: 5,
    sliceMode: "top"
  };

  componentWillReceiveProps(nextProps) {
    let { title, orderBy } = nextProps;
    let { numItems, sliceMode } = this.state;

    this.setState(
      () => ({ title, orderBy, numItems, sliceMode }),
      this.filterStocks
    );
  }

  filterStocks = () => {
    let { stocks } = this.props;
    let { numItems, sliceMode, orderBy } = this.state;
    let filteredStocks = transformMap(stocks, orderBy, numItems, sliceMode);   

    this.setState({ filteredStocks });
  };

  onChange = evt => {
    let target = evt.target;
    this.setState(
      () => ({
        [target.name]: target.value
      }),
      this.filterStocks
    );
  };

  render() {
    let { title, orderBy, sliceMode, numItems, filteredStocks } = this.state;
    let Header = (
      <div fill className="topstocks-title">
        <div className="topstocks-input">
          <FormGroup>
            <FormControl
              componentClass="select"
              name="sliceMode"
              bsSize="small"
              value={sliceMode}
              onChange={this.onChange}
            >
              <option value="top">Best</option>
              <option value="bottom">Worst</option>
            </FormControl>
          </FormGroup>
          <FormGroup>
            <FormControl
              componentClass="select"
              name="numItems"
              bsSize="small"
              value={numItems}
              onChange={this.onChange}
            >
              {[5, 10, 15, 20].map(n => <option key={n} value={n}>{n}</option>)}
            </FormControl>
          </FormGroup>
        </div>
        <div className="topstocks-title-text">
          <strong> {title} </strong>
        </div>
      </div>
    );
    let mapStockRow = stock => {
      let value = parseFloat(stock[orderBy].toFixed(2), 10);
      return (
        <tr key={stock.key}>
          <td> {stock.key} </td>
          <td className="number-field">
            <Colored
              value={formatCash(value, { maximumFractionDigits: 0 })}
              prefix={<FontAwesome name="usd" />}
            />

          </td>
        </tr>
      );
    };
    return (
      <Panel>
        {Header}
        <Table bordered responsive fill striped className="topstocks-table">
          {filteredStocks.length > 0 &&
            <tbody>
              {filteredStocks.map(mapStockRow)}
            </tbody>}
        </Table>
      </Panel>
    );
  }
}
