import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import injectTapEventPlugin from "react-tap-event-plugin";
import { ToastContainer } from "react-toastify";

// redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as quotesActions from "../../redux/actions/quotesActions";
import { loadWatchlists } from "../../redux/actions/watchlistsActions";

// components
import Sidebar from "../layout/Sidebar";
import Content from "../layout/Content";
import Watchlists from "../watchlists";
import { QuotesService } from "../../services";
import DashboardButton from "../dashboard/DashboardButton";
import ConfigInterval from "./ConfigInterval";

// styles
import "./App.css";
import {
  sidebarColStyle,
  sidebarSpacingStyle,
  contentColStyle
} from "./App.styles.js";
import "react-toastify/dist/ReactToastify.min.css";

injectTapEventPlugin();

class App extends Component {
  state = {
    selectedWatchlist: null,
    refInterval: 300
  };

  quotesTimer;

  componentDidMount() {
    this.props.actions.loadWatchlists();
    QuotesService.loadTickers();
    this.setNextQuotesUpdate();
  }

  componentWillUnmount() {
    clearTimeout(this.quotesTimer);
  }

  updateQuotes = () => {
    this.props.actions.fetchQuotes();
    this.setNextQuotesUpdate();
  };

  setNextQuotesUpdate = () => {
    this.quotesTimer = setTimeout(
      this.updateQuotes,
      this.state.refInterval * 1000
    );
  };

  onSelect = wl => {
    this.setState(() => ({ selectedWatchlist: wl }));
  };

  onChangeTimer = refInterval => {
    clearTimeout(this.quotesTimer);
    this.setState(() => ({ refInterval }), this.setNextQuotesUpdate);
  };

  render() {
    let selectedWatchlist = this.state.selectedWatchlist;
    let selectedWatchlistId;

    if (selectedWatchlist) {
      selectedWatchlist = selectedWatchlist.id
        ? this.props.watchlists.find(wl => wl.id === selectedWatchlist.id)
        : this.props.watchlists[this.props.watchlists.length - 1];
      selectedWatchlistId = selectedWatchlist.id;
    } else {
      selectedWatchlistId = null;
    }
    return (
      <div>
        <Grid fluid>
          <Row className="app-container">
            <Col
              lg={2}
              md={4}
              className="hidden-sm hidden-xs"
              style={sidebarColStyle}
            >
              <Sidebar>
                <div style={sidebarSpacingStyle}>
                  <DashboardButton onClick={this.onSelect} />
                </div>
                <div style={sidebarSpacingStyle}>
                  <Watchlists
                    onChangeSelection={this.onSelect}
                    selected={selectedWatchlist}
                  />
                </div>
                <div style={sidebarSpacingStyle}>
                  <ConfigInterval
                    interval={this.state.refInterval}
                    onChange={this.onChangeTimer}
                    style={sidebarSpacingStyle}
                  />
                </div>
              </Sidebar>
            </Col>
            <Col lg={10} md={8} style={contentColStyle}>
              <Content watchlistId={selectedWatchlistId} />
            </Col>
          </Row>
        </Grid>
        <ToastContainer />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    watchlists: state.watchlists || []
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...quotesActions, loadWatchlists }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
