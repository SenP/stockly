import React, { Component } from "react";
import ReactHighcharts from "react-highcharts";

export default class ChartComponent extends Component {
  chart;

  saveInstance = chartInstance => {
    this.chart = chartInstance;
  };

  updateData(idx, newVal) {
    if (this.chart && this.chart.series[0].data[idx]) {
      let oldVal = this.chart.series[0].data[idx].y;
      if (newVal !== oldVal) {
        this.chart.series[0].data[idx].update(newVal);
      }
    }
  }
  
  render() {
    return (
      <ReactHighcharts
        config={this.props.config}
        callback={this.saveInstance}
        isPureConfig
      />
    );
  }
}
