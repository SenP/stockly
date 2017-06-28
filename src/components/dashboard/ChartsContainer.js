import React, { Component } from "react";
import { object } from "prop-types";
import { Panel, Row, Col } from "react-bootstrap";

import Chart from "./ChartComponent";

export default class ChartsContainer extends Component {
  static propTypes = {
    chartData: object
  };

  static defaultProps = {
    chartData: {}
  };

  state = {};

  // Chart components
  daychangeChart;
  marketvalueChart;
  pnlChart;

  // Chart option objects
  optionsDaychangeChart;
  optionsPnLChart;
  optionsMarketValueChart;
  chartData;

  componentWillMount() {
    this.setChartOptions();
  }

  update = (idx, newValues) => {
    this.daychangeChart.updateData(idx, newValues.totalDayChange);
    this.marketvalueChart.updateData(idx, newValues.totalMarketValue);
    this.pnlChart.updateData(idx, newValues.totalPnL);
  };

  setChartOptions() {
    let chartData = this.props.chartData;

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
        categories: chartData.dataLabels
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
          data: chartData.pnlValues,
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
          data: chartData.daychangeValues,
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
          data: chartData.marketValues,
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
        <Col md={4}>
          <div className="chart-title">
            <h5>
              <strong> Net P/L by Watchlist </strong>
            </h5>
          </div>
          <Panel className="chart-panel">
            <Chart
              ref={chart => (this.pnlChart = chart)}
              config={this.optionsPnLChart}
            />
          </Panel>
        </Col>
        {/*--- Day Change Bar Chart ---*/}
        <Col md={4}>
          <div className="chart-title">
            <h5>
              <strong> Day Change by Watchlist </strong>
            </h5>
          </div>
          <Panel className="chart-panel">
            <Chart
              ref={chart => (this.daychangeChart = chart)}
              config={this.optionsDaychangeChart}
            />
          </Panel>
        </Col>
      </Row>
    );
  }
}
