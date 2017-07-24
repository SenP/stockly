import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import injectTapEventPlugin from "react-tap-event-plugin";
import { ToastContainer } from 'react-toastify';

// redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as quotesActions from "../../redux/actions/quotesActions";

// components
import Sidebar from "../layout/Sidebar";
import Content from "../layout/Content";
import Watchlists from "../watchlists";
import { QuotesService } from "../../services";
import DashboardButton from "../dashboard/DashboardButton";
import ConfigInterval from "./ConfigInterval.js";

// styles
import "./App.css";
import { sidebarColStyle, contentColStyle } from "./App.styles.js";
import 'react-toastify/dist/ReactToastify.min.css'; 

injectTapEventPlugin();

class App extends Component {
  state = {
    selectedWatchlist: null,
    refInterval: 300
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
    this.props.actions.fetchQuotes();
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

  onChangeTimer = refInterval => {
    clearTimeout(this.quotesTimer);
    this.setState(() => ({ refInterval }), this.setNextUpdate);
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
                <DashboardButton onClick={this.onSelect} />
                <Watchlists
                  onChangeSelection={this.onSelect}
                  selected={selectedWatchlist}
                />
                <ConfigInterval
                  interval={this.state.refInterval}
                  onChange={this.onChangeTimer}
                />
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
    actions: bindActionCreators(quotesActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
