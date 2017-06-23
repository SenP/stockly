import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { arrayOf, func, instanceOf } from "prop-types";
import { Panel } from "react-bootstrap";

import { Watchlist, WatchlistService, QuotesService } from "../../services";
import * as watchlistsActions from "../../redux/actions/watchlistsActions";
import WatchlistForm from "./WatchlistForm";
import Header from "./WatchlistsHeader";
import Watchlists from "./Watchlists";
import Message from "../common/Message";

const msgClasses = {
  error: "msg text-danger",
  info: "msg text-info"
};

export class WatchlistsContainer extends Component {
  static propTypes = {
    watchlists: arrayOf(instanceOf(Watchlist)),
    selected: instanceOf(Watchlist),
    onChangeSelection: func
  };

  static defaultProps = {
    watchlists: [],
    selected: null,
    onChangeSelection: () => {}
  };

  state = {
    editedWatchlist: null,
    isEditing: false,
    isAdding: false,
    isDeleting: false,
    msg: "",
    msgClass: ""
  };

  componentDidMount() {
    this.props.watchlists.forEach(wl => {
      wl.stocks.forEach(stock => {
        QuotesService.register(stock.code);
      });
    });
  }

  addWatchlist = () => {
    this.setState({ editedWatchlist: new Watchlist(), isAdding: true });
  };

  editWatchlist = () => {
    this.setState({
      editedWatchlist: Object.assign(new Watchlist(), this.props.selected),
      isEditing: true
    });
  };

  saveWatchlist = wl => {
    let { isAdding } = this.state;
    this.setState(() => ({
      msg: "Saving...please wait.",
      msgClass: msgClasses.info
    }));
    let valid = WatchlistService.validateWatchlist(wl, isAdding);
    if (valid.status === "error") {
      this.setState(() => ({
        msg: valid.msg,
        msgClass: msgClasses.error
      }));
      return valid;
    }
    isAdding
      ? this.props.actions.createWatchlist(wl)
      : this.props.actions.editWatchlist(wl);
    this.resetView();
    return { status: "success" };
  };

  deleteWatchlist = () => {
    let { watchlists, selected } = this.props;
    let delMsg = "Delete " + this.props.selected.name + " watchlist?";

    if (window.confirm(delMsg)) {
      this.setState({
        isDeleting: true,
        msg: "Deleting...please wait.",
        msgClass: msgClasses.info
      });

      //reset selected watchlist
      let newSelected;
      if (watchlists.length === 1) {
        // last watchlist deleted
        newSelected = null; //return to dashboard
      } else {
        let delidx = watchlists.findIndex(wl => wl.id === selected.id);
        //select new last wl if last wl is deleted or next wl if any other wl is deleted
        newSelected = delidx === watchlists.length - 1
          ? watchlists[delidx - 1]
          : watchlists[delidx + 1];
      }
      this.props.onChangeSelection(newSelected);
      this.props.actions.deleteWatchlist(selected);
      this.resetView();
    }
  };

  resetView = () => {
    this.setState({
      editedWatchlist: null,
      isEditing: false,
      isAdding: false,
      isDeleting: false,
      msg: "",
      msgClass: ""
    });
  };

  render() {
    let { editedWatchlist, isAdding, isDeleting, isEditing } = this.state;
    let watchlists = this.props.watchlists;
    let isViewState = !isAdding && !isEditing && !isDeleting;
    let Title = (
      <Header
        showAdd={isViewState}
        showEdit={!!this.props.selected && isViewState}
        onAdd={this.addWatchlist}
        onEdit={this.editWatchlist}
        onDelete={this.deleteWatchlist}
      />
    );
    let emptylistMsg = (
      <div
        style={{
          background: "#222230",
          border: "0px",
          padding: "5px"
        }}
      >
        <h5> No Watchlists available! </h5>
      </div>
    );

    return (
      <Panel header={Title} bsStyle="primary" className="panel-watchlists">

        {watchlists.length === 0 && isViewState && emptylistMsg}

        {(isAdding || isEditing) &&
          <WatchlistForm
            watchlist={editedWatchlist}
            submitFn={this.saveWatchlist}
            cancelFn={this.resetView}
          />}

        <div>
          <Message
            msgtext={this.state.msg}
            msgclass={this.state.msgClass}
            msgstyle={{ background: "#222230", display: "block" }}
          />
        </div>

        {isViewState &&
          <Watchlists
            items={watchlists}
            selectedItem={this.props.selected}
            onClick={this.props.onChangeSelection}
          />}

      </Panel>
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
    actions: bindActionCreators(watchlistsActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  WatchlistsContainer
);
