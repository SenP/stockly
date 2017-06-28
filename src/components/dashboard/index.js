import React, { Component } from "react";
import { connect } from "react-redux";
import { arrayOf, instanceOf } from "prop-types";
import { Row, Col } from "react-bootstrap";

import { Watchlist } from "../../services";
import Charts from "./ChartsContainer";
import Topstocks from "./TopstocksComponent";
import Summary from "./Summary";

import "./styles.css";

class DashboardContainer extends Component {
  static propTypes = {
    watchlists: arrayOf(instanceOf(Watchlist))
  };

  static defaultProps = {
    watchlists: []
  };

  state = {
    portfolioValue: 0,
    portfolioPnL: 0,
    portfolioDaychange: 0,
    stocksMap: null
  };

  charts;
  chartData;

  componentWillMount() {
    this.initChartData();
  }

  componentDidMount() {
    this.updateDashboard();
  }

  componentWillReceiveProps(nextProps) {
    this.setState(
      () => ({ watchlists: nextProps.watchlists }),
      this.updateDashboard
    );
  }

  updateDashboard = () => {
    let idx = 0;
    let portfolioDaychange, portfolioPnL, portfolioValue;
    let stocksMap = new Map();
    portfolioDaychange = portfolioPnL = portfolioValue = 0;
    this.props.watchlists.forEach(wl => {
      let totalDayChange = wl.totalDayChange;
      let totalMarketValue = wl.totalMarketValue;
      let totalPnL = wl.totalPnL;

      this.charts.update(idx, { totalDayChange, totalMarketValue, totalPnL });

      //update portfolio values
      portfolioValue += totalMarketValue;
      portfolioPnL += totalPnL;
      portfolioDaychange += totalDayChange;

      // update all stocks map
      wl.stocks.forEach(stock => {
        let stockMap = stocksMap.get(stock.code);
        if (stockMap) {
          stockMap.marketValue += stock.marketValue;
          stockMap.netPnL += stock.netPnL;
          stockMap.dayChange += stock.dayChange;
        } else {
          stocksMap.set(stock.code, {
            marketValue: stock.marketValue,
            netPnL: stock.netPnL,
            dayChange: stock.dayChange
          });
        }
      });

      idx += 1;
    });
    this.setState({
      portfolioValue,
      portfolioPnL,
      portfolioDaychange,
      stocksMap
    });
  };

  initChartData() {
    let chartData = {
      dataLabels: [],
      marketValues: [],
      pnlValues: [],
      daychangeValues: []
    };

    this.props.watchlists.forEach(wl => {
      chartData.dataLabels.push(wl.name);

      chartData.marketValues.push([wl.name, wl.totalMarketValue]);
      chartData.pnlValues.push(wl.totalPnL);
      chartData.daychangeValues.push(wl.totalDayChange);
    });
    this.chartData = chartData;
  }

  render() {
    return (
      <div>
        <Summary {...this.state} />
        
        <Charts
          chartData={this.chartData}
          ref={charts => (this.charts = charts)}
        />

        <Row>
          <Col md={4}>
            <Topstocks
              stocks={this.state.stocksMap}
              title="Stocks by Market Value"
              orderBy="marketValue"
            />
          </Col>
          <Col md={4}>
            <Topstocks
              stocks={this.state.stocksMap}
              title="Stocks by Net P/L"
              orderBy="netPnL"
            />
          </Col>
          <Col md={4}>
            <Topstocks
              stocks={this.state.stocksMap}
              title="Stocks by Day Change"
              orderBy="dayChange"
            />
          </Col>
        </Row>

      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    watchlists: state.watchlists || []
  };
}

export default connect(mapStateToProps, null)(DashboardContainer);
