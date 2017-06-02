import React, { Component } from "react";
import PropTypes from "prop-types";
import { ButtonToolbar, Button } from "react-bootstrap";
import {Watchlist} from '../../services';

export default class WatchlistForm extends Component {
  static propTypes = {
    watchlist: PropTypes.objectOf(Watchlist).isRequired,
    submitFn: PropTypes.func.isRequired,
    cancelFn: PropTypes.func.isRequired
  };

  static defaultProps = {
    watchlist: { id: null, name: "", description: ""}
  }; 

  state = Object.assign({}, this.props.watchlist);    
  
  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  };

  submitForm = evt => {
    evt.preventDefault();    
    this.props.submitFn(this.state);
  };

  render = () => {
    const formStyle = {
      background: "#222230",
      border: "0px",
      padding: "5px"
    };

    return (
      <div style={formStyle}>
        <form onSubmit={this.submitForm} className="form">
          <div className="form-group">
            <label> Name: </label>
            <input
              type="text"
              name="name"
              className="form-control input-sm"
              value={this.state.name}
              onChange={this.handleChange}
              maxLength="15"
              required
            />
          </div>
          <div className="form-group">
            <label> Description: </label>
            <input
              type="textarea"
              name="description"
              className="form-control input-sm"
              value={this.state.description}
              onChange={this.handleChange}
              maxLength="50"
            />
          </div>
          <ButtonToolbar>
            <Button
              type="submit"
              bsStyle="success"
              bsSize="small"
              disabled={this.state.msg}
            >
              Submit
            </Button>
            <Button
              type="button"
              bsStyle="danger"
              bsSize="small"
              onClick={this.props.cancelFn}
            >
              Cancel
            </Button>
          </ButtonToolbar>
        </form>
      </div>
    );
  };
}
