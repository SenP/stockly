import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { arrayOf, instanceOf } from "prop-types";
import { Panel, Row, Col } from "react-bootstrap";

import { Watchlist } from "../../services";
import Chart from "./ChartComponent";

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
    portfolioDaychange: 0
  };

  // Chart components
  // @ViewChild('daychangeChart') daychangeChart: FPChartComponent;
  // @ViewChild('marketvalueChart') marketvalueChart: FPChartComponent;
  // @ViewChild('pnlChart') pnlChart: FPChartComponent;

  // //Topstocks tables
  // @ViewChild('topMV') topMV: TopstocksComponent;
  // @ViewChild('topPL') topPL: TopstocksComponent;
  // @ViewChild('topDC') topDC: TopstocksComponent;

  // Chart option objects
  optionsDaychangeChart;
  optionsPnLChart;
  optionsMarketValueChart;
  chartData;

  // Portfolio values
  portfolioDaychange = 0;
  portfolioPnL = 0;
  portfolioValue = 0;

  // All stocks
  allStocks;

  stkorderPL = "top";
  stksizePL = 5;

  stkorderDC = "top";
  stksizeDC = 5;

  componentWillMount() {
    this.initChartData();
    this.setChartOptions();

    //subscribe to refresh scheduler and update dashboard at specified interval
    // this.refTimerSub = this.quoteService
    //     .getTimer()
    //     .subscribe(() => {
    //         this.updateDashboard();
    //     });
  }

  componentDidMount() {
    this.updateDashboard();
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    this.setState(
      () => ({ watchlists: nextProps.watchlists }),
      this.updateDashboard
    );
  }

  componentWillUnmount() {
    // this.refTimerSub.unsubscribe();
  }

  // recompute portfolio values, update charts with latest watchlist values
  updateDashboard = () => {
    let idx = 0;
    let portfolioDaychange, portfolioPnL, portfolioValue;
    let stocks = new Map();
    portfolioDaychange = portfolioPnL = portfolioValue = 0;
    this.props.watchlists.forEach(wl => {
      let totalDayChange = wl.totalDayChange;
      let totalMarketValue = wl.totalMarketValue;
      let totalPnL = wl.totalPnL;

      //update the charts with new values
      // this.daychangeChart.updateData(idx, totalDayChange);
      this.marketvalueChart.updateData(idx, totalMarketValue);
      // this.pnlChart.updateData(idx, totalPnL);

      //update portfolio values
      portfolioValue += totalMarketValue;
      portfolioPnL += totalPnL;
      portfolioDaychange += totalDayChange;

      // update all stocks map
      wl.stocks.forEach(ins => {
        let stk = stocks.get(ins.code);
        stk ? stk.push(ins) : stocks.set(ins.code, [ins]);
      });

      idx += 1;
    });
    this.setState({
      portfolioValue,
      portfolioPnL,
      portfolioDaychange
    });
    //update allstocks list
    this.allStocks = stocks;
  };

  // compute initial chart values
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

  // set the chart display options
  setChartOptions() {
    let tooltipFn = txt =>
      "<strong>{x}</strong><br/> " + txt + "<b>$ {point.y}</b>";

    let chartStyle = {
      "font-family": "Lato,'Helvetica Neue', Helvetica, Arial,'sans-serif'"
    };

    let optionsBaseChart = {
      title: {
        text: null
      },
      xAxis: {
        categories: this.chartData.dataLabels
      },
      yAxis: {
        title: {
          text: null
        }
      },
      legend: {
        enabled: false
      },
      credits: {
        enabled: true
      }
    };

    this.optionsPnLChart = Object.assign({}, optionsBaseChart, {
      chart: {
        type: "column",
        style: chartStyle
      },
      series: [
        {
          data: this.chartData.pnlValues,
          dataLabels: { enabled: true, format: "$ {y}" },
          tooltip: { pointFormat: tooltipFn("Net P/L:") },
          color: "green",
          negativeColor: "red"
        }
      ]
    });

    this.optionsDaychangeChart = Object.assign({}, optionsBaseChart, {
      chart: {
        type: "column",
        style: chartStyle
      },
      series: [
        {
          data: this.chartData.daychangeValues,
          dataLabels: { enabled: true, format: "$ {y}" },
          tooltip: { pointFormat: tooltipFn("Day Change:") },
          color: "green",
          negativeColor: "red"
        }
      ]
    });

    this.optionsMarketValueChart = Object.assign({}, optionsBaseChart, {
      chart: {
        type: "pie",
        style: chartStyle
      },
      plotOptions: {
        pie: {
          innerSize: "40%",
          center: ["50%", "50%"],
          borderColor: null
        }
      },
      series: [
        {
          data: this.chartData.marketValues,
          dataLabels: {
            enabled: true,
            format: "{key}<br><b>$ {y}</b>",
            distance: 15,
            connectorPadding: 5,
            connectorWidth: 2
          },
          tooltip: { pointFormat: tooltipFn("Market Value:") }
        }
      ]
    });
  }

  render() {
    return (
      <Panel className="text-center">
        <Row>
          <Col md={12}>
            <span className="text-center">
              <h4>
                <strong> Portfolio Dashboard </strong>
              </h4>
            </span>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <span className="text-center">
              <h5> Total Market Value </h5>
            </span>
            <span className="text-center">
              <h4>
                <strong> {this.state.portfolioValue.toFixed(2)}</strong>
              </h4>
            </span>
          </Col>
          <Col md={4}>
            <span className="text-center">
              <h5> Net Profit/Loss </h5>
            </span>
            <span className="text-center">
              <h4>
                <strong> {this.state.portfolioPnL.toFixed(2)}</strong>
              </h4>
            </span>
          </Col>
          <Col md={4}>
            <span className="text-center">
              <h5> Total Day Change </h5>
            </span>
            <span className="text-center">
              <h4>
                <strong> {this.state.portfolioDaychange.toFixed(2)}</strong>
              </h4>
            </span>
          </Col>
        </Row>
        <div className="panel-body">
          {/*Charts*/}
          <Row>
            {/*---Market Values Pie Chart---*/}
            <Col md={4}>
              <div className="chart-title">
                <h5>
                  <strong> Market Value by Watchlist </strong>
                </h5>
              </div>
              <Panel className="chart-panel">
                <Chart
                  ref={chart => (this.marketvalueChart = chart)}
                  config={this.optionsMarketValueChart}
                />
              </Panel>
            </Col>
            {/*--- Net P/L Bar Chart ---*/}
            {/*<div class="col-md-4">
				<div class="chart-title">
					<h5><strong> Net P/L by Watchlist </strong> </h5>
				</div>
				<div class="panel panel-default chart-panel">
					<fp-chart #pnlChart [config]="optionsPnLChart"></fp-chart>
				</div>
			</div>
			<!--Day Change Bar Chart-->
			<div class="col-md-4">
				<div class="chart-title">
					<h5><strong> Day Change by Watchlist </strong> </h5>
				</div>
				<div class="panel panel-default chart-panel">
					<fp-chart #daychangeChart [config]="optionsDaychangeChart"></fp-chart>
				</div>
			</div>*/}
          </Row>
          &nbsp;
          {/*Top stocks tables*/}
          <div className="row">
            {/*<div class="col-md-4">
				<div class="chart-title">
					<h5><strong> Stocks by Market Value </strong> </h5>
					&emsp;&emsp;
					<select #stkorderMV>
							<option value="top" selected>Top</option>
							<option value="bottom">Bottom</option>
						</select>
					<select #stksizeMV>
							<option *ngFor="let n of [5,10,15,20]" [value]="n">{{ n }}</option>
						</select>
				</div>
				<div class="panel panel-default">
					<fp-topstocks #topMV [stocks]="allStocks" title="Market Value ($)" [orderBy]="'marketValue'"
							[sliceMode]="stkorderMV.value" [numItems]="stksizeMV.value">
					</fp-topstocks>
				</div>
			</div>*/}
            {/*<div class="col-md-4">
				<div class="chart-title">
					<h5><strong> Stocks by Net P/L </strong> </h5>
					&emsp;&emsp;
					<select [(ngModel)]="stkorderPL">
							<option value="top">Top</option>
							<option value="bottom">Bottom</option>
						</select>
					<select [(ngModel)]="stksizePL">
							<option *ngFor="let n of [5,10,15,20]" [value]="n">{{ n }}</option>
						</select>
				</div>
				<div class="panel panel-default">
					<fp-topstocks #topPL [stocks]="allStocks" title="Net P/L ($)" [orderBy]="'netPnL'"
							[sliceMode]="stkorderPL" [numItems]="stksizePL">
					</fp-topstocks>
				</div>
			</div>*/}
            {/*<div class="col-md-4">
				<div class="chart-title">
					<h5><strong> Stocks by Day Change </strong> </h5>
					&emsp;&emsp;
					<select [(ngModel)]="stkorderDC">
							<option value="top">Top</option>
							<option value="bottom">Bottom</option>
						</select>
					<select [(ngModel)]="stksizeDC">
							<option *ngFor="let n of [5,10,15,20]" [value]="n">{{ n }}</option>
						</select>
				</div>
				<div class="panel panel-default">
					<fp-topstocks #topDC [stocks]="allStocks" title="Day Change ($)" [orderBy]="'dayChange'"
							[sliceMode]="stkorderDC" [numItems]="stksizeDC">
					</fp-topstocks>
				</div>
			</div>*/}
          </div>
        </div>
      </Panel>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    watchlists: state.watchlists || []
  };
}

export default connect(mapStateToProps, null)(DashboardContainer);
