import React, { Component } from "react";
import { instanceOf } from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as watchlistActions from "../../redux/actions/watchlistActions";
import * as watchlistsActions from "../../redux/actions/watchlistsActions";
import { Panel, Button } from "react-bootstrap";

import {
  Watchlist,
  Stock,
  WatchlistService,
  QuotesService
} from "../../services";
import StocksList from "./StocksList";
import AddStockForm from "./AddStockForm";
import Header from "./WatchlistHeader";

export class WatchlistContainer extends Component {
  static propTypes = {
    watchlist: instanceOf(Watchlist)
  };

  static defaultProps = {
    watchlist: null
  };

  state = {
    editedStock: null,
    isEditing: false,
    isAdding: false,
    isDeleting: false,
    selectStkCode: null,
    selectStkName: null
  };

  addStock = () => {
    this.setState({ editedStock: new Stock(), isAdding: true });
  };

  editStock = stock => {
    this.setState({
      editedStock: Object.assign(new Stock(), stock),
      isEditing: true
    });
  };

  saveStock = stock => {
    let { watchlist, actions } = this.props;
    let { isAdding } = this.state;
    let valid = WatchlistService.validateStock(watchlist, stock, isAdding);
    if (valid.status === "error") {
      return valid;
    }
    if (isAdding) {
      actions.addStock(stock, watchlist);
      // TODO: move this to saga
      QuotesService.refreshQuotes(stock).then(newQuote => {
        if (newQuote) {
          this.props.actions.fetchQuotesSuccess(newQuote);
        }
      });
    } else {
      actions.editStock(stock, watchlist);
    }

    this.resetView();
    return { status: "success" };
  };

  deleteStock = stock => {
    let watchlist = this.props.watchlist;
    this.props.actions.deleteStock(stock, watchlist);
    this.resetView();
    return { status: "success" };
  };

  resetView = () => {
    this.setState({
      editedStock: null,
      isEditing: false,
      isAdding: false,
      isDeleting: false
    });
  };

  render() {
    const { watchlist } = this.props;

    const isViewing =
      !this.state.isAdding && !this.state.isEditing && !this.state.isDeleting;

    const Title = <Header watchlist={watchlist} />;

    const AddButton = (
      <div className="text-right">
        <Button
          bsStyle="success"
          onClick={this.addStock}
          style={{ marginBottom: "10px" }}
        >
          Add Stock
        </Button>
      </div>
    );

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
          {watchlist &&
            watchlist.stocks.length === 0 &&
            isViewing &&
            emptylistMsg}

          {isViewing && AddButton}

          {this.state.isAdding &&
            <div>
              <AddStockForm
                stock={this.state.editedStock}
                submitFn={this.saveStock}
                cancelFn={this.resetView}
              />
            </div>}
        </div>

        <StocksList
          isViewing={isViewing}
          watchlist={watchlist}
          onEdit={this.saveStock}
          onDelete={this.deleteStock}
        />

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
