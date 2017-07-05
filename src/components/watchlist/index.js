import React, { Component } from "react";
import { instanceOf } from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as watchlistActions from "../../redux/actions/watchlistActions";
import * as watchlistsActions from "../../redux/actions/watchlistsActions";
import { Panel } from "react-bootstrap";

import { Watchlist as WatchlistModel } from "../../services";
import StocksList from "./StocksList";
import AddStockForm from "./AddStockForm";
import Header from "./WatchlistHeader";

export class WatchlistContainer extends Component {
  static propTypes = {
    watchlist: instanceOf(WatchlistModel)
  };

  static defaultProps = {
    watchlist: null
  };

  state = {
    watchlist: this.props.watchlist
  };

  componentWillReceiveProps(newProps) {
    this.setState({
      watchlist: newProps.watchlist
    });
  }

  render() {
    const { watchlist } = this.state;

    const Title = <Header watchlist={watchlist} />;

    const emptylistMsg = (
      <div className="jumbotron text-center">
        <h3> Watchlist is empty! </h3>
      </div>
    );

    return (
      <div>
        <Panel
          header={Title}
          bsStyle="primary"
          className="panel-watchlist text-center"
        />

        <div>
          {watchlist && watchlist.stocks.length === 0 && emptylistMsg}
          <AddStockForm watchlist={watchlist} />
        </div>

        <StocksList watchlist={watchlist} />

        <div className="pull-right">
          <small> Price data from Google Finance and may be delayed. </small>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    watchlist: state.watchlists.find(wl => wl.id === ownProps.watchlistId)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      ...bindActionCreators(watchlistActions, dispatch),
      ...bindActionCreators(watchlistsActions, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WatchlistContainer);
