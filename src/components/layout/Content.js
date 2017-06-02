import React from "react";
// import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";

const contentStyle = {
  margin: "0px",
  padding: "10px 10px"
};

const Content = props => (
  <div style={contentStyle}>
    {!!props.watchlist && JSON.stringify(props.watchlist)}
    {!props.watchlist && <Dashboard />}
  </div>
);

export default Content;
