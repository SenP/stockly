import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Grid, Row, Col } from "react-bootstrap";
import injectTapEventPlugin from "react-tap-event-plugin";
// import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import Content from "../components/layout/Content";
import { WatchlistService, QuotesService } from "../services";

import "./App.css";
import { sidebarColStyle, contentColStyle } from "./App.styles.js";

injectTapEventPlugin();

class App extends Component {
  state = {
    selectedWatchlist: null,
    refInterval: 60
  };

  componentWillMount() {
    // Start quote service and update quotes at refInterval
    QuotesService.init(this.state.refInterval * 1000).subscribe(qmap => {
      WatchlistService.updateQuotes(qmap);
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
              <Col className="hidden-xs" style={sidebarColStyle}>
                <Sidebar onSelect={this.onSelect} />
              </Col>
              <Col lg={12} md={12} sm={12} style={contentColStyle}>
                <Content watchlist={this.state.selectedWatchlist} />
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
