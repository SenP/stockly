import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  ButtonToolbar,
  Button,
  Form,
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
import { Watchlist } from "../../services";

export default class WatchlistForm extends Component {
  static propTypes = {
    watchlist: PropTypes.instanceOf(Watchlist).isRequired,
    submitFn: PropTypes.func.isRequired,
    cancelFn: PropTypes.func.isRequired
  };

  static defaultProps = {
    watchlist: { id: null, name: "", description: "" }
  };

  state = Object.assign({}, this.props.watchlist);

  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value.trim()
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
      padding: "0px"
    };

  const formTitle = (
      <span style={{ textAlign: "center" }}>
        <h4>          
            {!this.state.id ? "Create Watchlist" : "Edit Watchlist"}          
        </h4>        
      </span>
    );

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
              value={this.state.name}
              onChange={this.handleChange}
              maxLength="15"                     
              autoFocus
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel> Description: </ControlLabel>
            <FormControl
              type="textarea"
              name="description"
              bsSize="small"
              value={this.state.description}
              onChange={this.handleChange}
              maxLength="50"
            />
          </FormGroup>
          <ButtonToolbar>
            <Button
              type="submit"
              bsStyle="success"
              bsSize="small"
              disabled={!this.state.name.trim()}
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
        </Form>
      </div>
    );
  };
}
