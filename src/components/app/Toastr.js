import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { AddToast } from "../../utils/Toaster";

class Toastr extends Component {
  state = {
    toasts: this.props.toasts
  };

  componentWillReceiveProps(newProps) {
    console.log("toasts:", newProps);
    this.setState(() => ({
      toasts: newProps.toasts
    }));
  }

  render() {
    console.log("toasts...", this.state);
    this.state.toasts.map(toast => AddToast(toast));
    return null;
  }
}

function mapStateToProps(state, ownProps) {
  return {
    toasts: state.toasts.map(({ msg, msgtype }) => ({
      msg,
      msgtype
    }))
  };
}

export default connect(mapStateToProps, null)(Toastr);
