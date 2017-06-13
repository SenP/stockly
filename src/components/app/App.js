import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Grid, Row, Col } from "react-bootstrap";
import injectTapEventPlugin from "react-tap-event-plugin";
// import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";
import Content from "../layout/Content";
import { WatchlistService, QuotesService } from "../../services";

import "./App.css";
import { sidebarColStyle, contentColStyle } from "./App.styles.js";

injectTapEventPlugin();

class App extends Component {
  state = {
    selectedWatchlist: null,
    refInterval: 60,
    refreshQuotes: false
  };

  componentWillMount() {
    // Start quote service and update quotes at refInterval
    QuotesService.init(this.state.refInterval * 1000).subscribe(qmap => {
      this.setState({
        refreshQuotes: false
      });
      WatchlistService.updateQuotes(qmap).then(() =>
        this.setState({
          refreshQuotes: true
        })
      );
    });

    // Load the supported tickers
    QuotesService.getTickers();
  }

  onSelect = wl => {
    this.setState({ selectedWatchlist: wl });
  };

  onChangeTimer = val => {
    this.setState({ refInterval: val });
    QuotesService.resetTimer(this.refInterval * 1000);
  };

  render() {
    return (
      // <Router>
      (
        <div>
          <Grid fluid>
            <Row>
              <Col>
                <Header />
              </Col>
            </Row>
            <Row className="app-container">
              <Col lg={2} md={4} className="hidden-sm hidden-xs" style={sidebarColStyle}>
                <Sidebar onSelect={this.onSelect} />
              </Col>
              <Col lg={10} md={8} style={contentColStyle}>
                <Content
                  watchlist={this.state.selectedWatchlist}
                  refresh={this.state.refreshQuotes}
                />
              </Col>
            </Row>
          </Grid>
        </div>
      )
      // </Router>
    );
  }
}

export default App;
