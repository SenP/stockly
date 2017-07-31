import React, { Component } from "react";
import { instanceOf, func, bool } from "prop-types";
import { Button } from "react-bootstrap";

import { Watchlist } from "../../services";
import Message from "../common/Message";

const msgClasses = {
  error: "msg text-center text-danger",
  info: "msg text-center text-info"
};

export default class DeleteWatchlistForm extends Component {
  static propTypes = {
    watchlist: instanceOf(Watchlist).isRequired,
    onDelete: func.isRequired,
    onClose: func.isRequired,
    saving: bool
  };

  state = {
    msg: null,
    msgClass: null,
    saving: false
  };

  componentWillMount() {
    this.setCompState(this.props);
  }

  componentWillReceiveProps(newProps) {
    this.setCompState(newProps);
  }

  setCompState = ({ saving, watchlist }) => {
    let msg = saving
      ? `Deleting ${watchlist.name}...please wait.`
      : `  Delete '${watchlist.name}' watchlist?  `;
    this.setState(() => ({
      msg,
      msgClass: saving ? msgClasses.info : msgClasses.error,
      saving
    }));
  };

  submitForm = evt => {
    let { watchlist, onDelete } = this.props;
    onDelete(watchlist);
  };

  closeForm = () => {
    this.setState(() => ({
      msg: "",
      msgClass: "",
      saving: false
    }));
    this.props.onClose();
  };

  render = () => {
    let { saving } = this.props;

    return (
      <div>
        <div className="text-center" style={{ margin: "10px" }}>
          <Message msgtext={this.state.msg} msgclass={this.state.msgClass} />
        </div>
        <div className="text-center">
            <Button
              bsStyle="danger"
              bsSize="xsmall"
              style={{ marginLeft: "5px" }}
              onClick={this.submitForm}
              disabled={saving}
            >
              Yes
            </Button>
            <Button
              bsStyle="default"
              bsSize="xsmall"
              style={{ marginLeft: "5px" }}
              onClick={this.closeForm}
              disabled={saving}
            >
              No
            </Button>
        </div>
      </div>
    );
  };
}
