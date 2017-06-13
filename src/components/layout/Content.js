import React from "react";
import PropTypes from 'prop-types';
// import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import Watchlist from '../watchlist';
import {Watchlist as WatchlistModel} from '../../services';

const contentStyle = {
  margin: "0px",
  padding: "10px 10px",  
};

const Content = props => (
  <div style={contentStyle}>
    {!!props.watchlist && <Watchlist watchlist={props.watchlist} />}
    {!props.watchlist && <Dashboard />}
  </div>
);

Content.propTypes = {
  watchlist: PropTypes.instanceOf(WatchlistModel)
};

export default Content;
