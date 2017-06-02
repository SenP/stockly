import React, { Component } from "react";
import PropTypes from "prop-types";
import { Panel } from "react-bootstrap";
import { Watchlist, WatchlistService, QuotesService } from "../../services";
import WatchlistForm from "./WatchlistForm";
import Header from "./WatchlistsHeader";
import Watchlists from "./Watchlists";
import Message from "../common/Message";

const msgClasses = {
  error: "msg text-danger",
  info: "msg text-info"
};

export default class WatchlistsContainer extends Component {
  static propTypes = {
    onChangeSelection: PropTypes.func.isRequired
  };

  static defaultProps = {};

  state = {
    watchlists: [],
    selectedWatchlist: null,
    editedWatchlist: null,
    isEditing: false,
    isAdding: false,
    isDeleting: false,
    msg: "",
    msgClass: ""
  };

  componentWillMount() {
    WatchlistService.getWatchlists().then(watchlists => {
      this.setState(() => ({ watchlists, selectedWatchlist: watchlists[0]}));
      watchlists.forEach(wl => {
        wl.instruments.forEach(stock => {
          QuotesService.register(stock.instrument, stock.exchange);
        });
      });
    });
  }  

  onChangeSelection = wl => {
    this.setState({ selectedWatchlist: wl });
    this.props.onChangeSelection(wl);
  };

  addWatchlist = () => {
    this.setState({ editedWatchlist: new Watchlist(), isAdding: true });
    // setTimeout(() => this.editName.nativeElement.focus(), 100);
  };

  editWatchlist = () => {
    this.setState({
      editedWatchlist: Object.assign(
        new Watchlist(),
        this.state.selectedWatchlist
      ),
      isEditing: true
    });
    // setTimeout(() => this.editName.nativeElement.focus(), 100);
  };

  saveWatchlist = wl => {
    this.setState(prevState => ({
      msg: "Saving...please wait.",
      msgClass: msgClasses.info
      // editedWatchlist: Object.assign({}, prevState.editedWatchlist, wl)
    }));
    WatchlistService.saveWatchlist(wl).then(res => {
      if (res.status === "error") {
        this.setState({
          msg: res.msg,
          msgClass: msgClasses.error
        });
      } else {
        this.resetView();
        this.onChangeSelection(res.data);
      }
    });
  };

  deleteWatchlist = () => {
    let watchlists = this.state.watchlists;
    let selectedWL = this.state.selectedWatchlist;
    if (
      window.confirm(
        "Delete " + this.state.selectedWatchlist.name + " watchlist?"
      )
    ) {
      this.setState({
        isDeleting: true,
        msg: "Deleting...please wait.",
        msgClass: msgClasses.info
      });
      let delidx = watchlists.findIndex(wl => wl.id === selectedWL.id);
      WatchlistService.deleteWatchlist(selectedWL).then(res => {
        this.resetView();
        //reset selected watchlist
        if (watchlists.length === 0) {
          // last watchlist deleted
          this.onChangeSelection(null); //return to dashboard
        } else {
          //select new last wl if last wl is deleted or next wl if any other wl is deleted
          let newidx = delidx === watchlists.length ? delidx - 1 : delidx;
          this.onChangeSelection(watchlists[newidx]);
        }
      });
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
    console.log("rendering...", this.state);
    let isViewState =
      !this.state.isAdding && !this.state.isEditing && !this.state.isDeleting;
    let Title = (
      <Header
        showButtons={isViewState}
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
        <h4> No Watchlists available! </h4>
        <p> Click the + button above to create a new watchlist.</p>
      </div>
    );

    return (
      <Panel header={Title} bsStyle="primary" className="panel-watchlists">

        {this.state.watchlists.length === 0 && isViewState && emptylistMsg}

        {(this.state.isAdding || this.state.isEditing) &&
          <div>
            <WatchlistForm
              watchlist={this.state.editedWatchlist}
              submitFn={this.saveWatchlist}
              cancelFn={this.resetView}
            />
          </div>}

        <Message
          text={this.state.msg}
          class={this.state.msgClass}
          style={{ background: "#222230" }}
          onClose={() => this.setState({ msg: "" })}
        />

        <Watchlists
          hidden={!isViewState}
          items={this.state.watchlists}
          selectedItem={this.state.selectedWatchlist}
          onClick={this.onChangeSelection}
        />

      </Panel>
    );
  }
}
