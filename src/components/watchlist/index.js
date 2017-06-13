import React, { Component } from "react";
import PropTypes from "prop-types";
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
import Message from "../common/Message";
import validateStock from "./validateStock";

const msgClasses = {
  error: " msg text-center text-danger",
  info: "msg text-center text-info"
};

export default class WatchlistContainer extends Component {
  static propTypes = {
    watchlist: PropTypes.instanceOf(Watchlist)
  };

  static defaultProps = {
    watchlist: null
  };

  state = {
    watchlist: this.props.watchlist,
    editedStock: null,
    isEditing: false,
    isAdding: false,
    isDeleting: false,
    msg: "",
    msgClass: "",
    selectStkCode: null,
    selectStkName: null
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      watchlist: nextProps.watchlist
    });
  }

  ngOnChanges() {
    this.isEditing = false;
    this.isAdding = false;
    this.isDeleting = false;
  }

  addStock = () => {
    this.setState({ editedStock: new Stock(), isAdding: true });
    //setTimeout(() => this.editCode.nativeElement.focus(), 100);
  };

  editStock = stock => {
    this.setState({
      editedStock: Object.assign(new Stock(), stock),
      isEditing: true
    });
    // setTimeout(() => this.editUnits.nativeElement.focus(), 100);
  };

  saveStock = stock => {
    let { watchlist, isAdding } = this.state;
    let valid = validateStock(watchlist, stock, isAdding ? "add" : "edit");
    if (valid.status === "error") {
      this.setState({
        msg: valid.msg,
        msgClass: msgClasses.error
      });
      return false;
    } else {
      this.setState(prevState => ({
        msg: "Saving...please wait.",
        msgClass: msgClasses.info
      }));
      WatchlistService.saveStock(watchlist, stock).then(res => {
        if (res.status === "error") {
          this.setState({
            msg: res.msg,
            msgClass: msgClasses.error
          });
          return false;
        } else {
          this.resetView();
          return true;
        }
      });
    }
  };

  deleteStock = stock => {
    let watchlist = this.state.watchlist;
    let delMsg = `Delete '${stock.name}(${stock.code})' from '${watchlist.name}' watchlist?`;

    if (window.confirm(delMsg)) {
      this.setState({
        isDeleting: true,
        msg: "Deleting...please wait.",
        msgClass: msgClasses.info
      });

      WatchlistService.deleteStock(watchlist, stock).then(this.resetView);
    }
  };

  resetView = () => {
    this.setState({
      watchlist: this.props.watchlist,
      editedStock: null,
      isEditing: false,
      isAdding: false,
      isDeleting: false,
      msg: "",
      msgClass: "",
      selectStkCode: null,
      selectStkName: null
    });
  };

  render() {
    let isViewing =
      !this.state.isAdding && !this.state.isEditing && !this.state.isDeleting;

    const Title = <Header watchlist={this.state.watchlist} />;

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

    let emptylistMsg = (
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
          {this.state.watchlist.stocks.length === 0 &&
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

          <Message
            text={this.state.msg}
            class={this.state.msgClass}
            onClose={() => this.setState({ msg: "" })}
          />
        </div>

        <StocksList
          isViewing={isViewing}
          watchlist={this.state.watchlist}
          onEdit={this.saveStock}
          onDelete={this.deleteStock}
        />

        <div>
          <span className="pull-right">
            <br />
            <small> Price data from Google Finance and may be delayed. </small>
          </span>
        </div>
      </div>
    );
  }
}
