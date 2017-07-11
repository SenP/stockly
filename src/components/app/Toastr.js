import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { toast } from "react-toastify";

class Toastr extends Component {
  state = {
    messages: this.props.messages
  };

  componentWillReceiveProps(newProps) {
    console.log("new messages:", newProps);
    this.setState(() => ({
      messages: newProps.messages
    }));    
  }
  render() {
    this.state.messages.map(msg => {
      toast(msg.status);
    });
    return null;
  }
}

function mapStateToProps(state, ownProps) {
  return {
    messages: state.stocksAsyncOp.map(op => {
      return {
        status: op.status,
        error: op.error
      };
    })
  };
}

// function mapDispatchToProps(dispatch) {
//   return {
//     actions: bindActionCreators(watchlistActions, dispatch)
//   };
// }

export default connect(mapStateToProps, null)(Toastr);
