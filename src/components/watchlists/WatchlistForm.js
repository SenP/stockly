import React, { Component } from "react";
import { instanceOf, bool, string, func } from "prop-types";
import {
  ButtonToolbar,
  Button,
  Form,
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
import { Watchlist, WatchlistService } from "../../services";
import Message from "../common/Message";

const msgClasses = {
  error: "msg text-center text-danger",
  info: "msg text-center text-info"
};

export default class WatchlistForm extends Component {
  static propTypes = {
    watchlist: instanceOf(Watchlist).isRequired,
    saving: bool,
    error: string,
    onSave: func.isRequired,
    onClose: func.isRequired
  };

  static defaultProps = {
    watchlist: { id: null, name: "", description: "" },
    saving: false,
    error: null,
    onSave: () => {},
    onClose: () => {}
  };

  state = {
    watchlist: this.props.watchlist,
    msg: "",
    msgClass: "",
    saving: false,
    error: null
  };

  componentWillMount() {
    let { saving, watchlist, error = null } = this.props;
    let msg = saving ? "Saving...please wait." : error;
    let msgClass = saving ? msgClasses.info : msgClasses.error;

    this.setState(() => ({
      watchlist,
      msg,
      msgClass,
      saving
    }));
  }

  componentWillReceiveProps({ saving = false, error = null }) {
    this.setState(() => ({
      msg: saving ? "Saving...please wait." : error,
      msgClass: saving ? msgClasses.info : msgClasses.error,
      saving
    }));
  }

  handleChange = ({ target }) => {
    this.setState(prevState => ({
      watchlist: Object.assign(new Watchlist(), prevState.watchlist, {
        [target.name]: target.value.trim()
      })
    }));
  };

  submitForm = evt => {
    let { watchlist } = this.state;
    let valid = WatchlistService.validateWatchlist(watchlist);
    if (valid.status === "error") {
      this.setState({
        msg: valid.msg,
        msgClass: msgClasses.error
      });
      return;
    }
    this.props.onSave(watchlist);
  };

  closeForm = () => {
    let { watchlist, onClose } = this.props;
    this.setState(() => ({
      watchlist,
      msg: "",
      msgClass: ""
    }));
    onClose();
  };

  render = () => {
    const formStyle = {
      background: "#222230",
      border: "0px",
      padding: "0px"
    };

    const formTitle = (
      <span style={{ textAlign: "center" }}>
        <h4>
          {!this.state.id ? "Create Watchlist" : "Edit Watchlist"}
        </h4>
      </span>
    );

    let { watchlist, msg, msgClass, saving } = this.state;

    return (
      <div style={formStyle}>
        {formTitle}
        <Form onSubmit={this.submitForm}>
          <FormGroup>
            <ControlLabel> Name: </ControlLabel>
            <FormControl
              type="text"
              name="name"
              bsSize="small"
              value={watchlist.name}
              onChange={this.handleChange}
              maxLength={15}
              autoFocus
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel> Description: </ControlLabel>
            <FormControl
              type="textarea"
              name="description"
              bsSize="small"
              value={watchlist.description}
              onChange={this.handleChange}
              maxLength={50}
            />
          </FormGroup>
          <ButtonToolbar>
            <Button
              bsStyle="success"
              bsSize="small"
              onClick={this.submitForm}
              disabled={saving}
            >
              Submit
            </Button>
            <Button
              bsStyle="danger"
              bsSize="small"
              onClick={this.closeForm}
              disabled={saving}
            >
              Cancel
            </Button>
          </ButtonToolbar>
        </Form>
        <span style={{ textAlign: "center", marginTop: "10px" }}>
          <Message msgtext={msg} msgclass={msgClass} />
        </span>
      </div>
    );
  };
}
