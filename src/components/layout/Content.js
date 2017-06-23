import React from "react";
import { number } from "prop-types";
import Dashboard from "../dashboard";
import Watchlist from "../watchlist";

const contentStyle = {
  margin: "0px",
  padding: "10px 10px"
};

Content.propTypes = {
  watchlistId: number
};

function Content({ watchlistId }) {
  return (
    <div style={contentStyle}>
      {!!watchlistId && <Watchlist watchlistId={watchlistId} />}
      {!watchlistId && <Dashboard />}
    </div>
  );
}

export default Content;
