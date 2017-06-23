import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import injectTapEventPlugin from "react-tap-event-plugin";

// redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as watchlistsActions from "../../redux/actions/watchlistsActions";

// components
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";
import Content from "../layout/Content";
import Watchlists from "../watchlists";
import { QuotesService } from "../../services";
import DashboardButton from "../dashboard/dashboardButton";
import ConfigInterval from "./ConfigInterval.js";

// styles
import "./App.css";
import { sidebarColStyle, contentColStyle } from "./App.styles.js";

injectTapEventPlugin();

class App extends Component {
  state = {
    selectedWatchlist: null,
    refInterval: 30
  };

  quotesTimer;

  componentDidMount() {
    QuotesService.loadTickers();
    this.updateQuotes();
  }

  componentWillUnmount() {
    clearTimeout(this.quotesTimer);
  }

  updateQuotes = () => {
    QuotesService.refreshQuotes().then(newQuotes => {
      if (newQuotes) {
        this.props.actions.fetchQuotesSuccess(newQuotes);
      }
    });
    this.setNextUpdate();
  };

  setNextUpdate = () => {
    this.quotesTimer = setTimeout(
      this.updateQuotes,
      this.state.refInterval * 1000
    );
  };

  onSelect = wl => {
    this.setState(() => ({ selectedWatchlist: wl }));
  };

  onChangeTimer = val => {
    clearTimeout(this.quotesTimer);
    this.setState(() => ({ refInterval: val }), this.setNextUpdate);
  };

  render() {
    let selectedWatchlist = this.state.selectedWatchlist;
    return (
      <div>
        <Grid fluid>
          <Row>
            <Col>
              <Header />
            </Col>
          </Row>
          <Row className="app-container">
            <Col
              lg={2}
              md={4}
              className="hidden-sm hidden-xs"
              style={sidebarColStyle}
            >
              <Sidebar onSelect={this.onSelect} selected={selectedWatchlist}>
                <DashboardButton onClick={this.onSelect} />
                <Watchlists
                  onChangeSelection={this.onSelect}
                  selected={this.state.selectedWatchlist}
                />
                <ConfigInterval
                  interval={this.state.refInterval}
                  onChange={this.onChangeTimer}
                />
              </Sidebar>
            </Col>
            <Col lg={10} md={8} style={contentColStyle}>
              <Content
                watchlistId={selectedWatchlist && selectedWatchlist.id}
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(watchlistsActions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(App);
