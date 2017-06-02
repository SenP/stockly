import React from "react";

const Message = props =>
  !!props.text &&
  <div className={props.class} style={props.style}>
    {props.text} &nbsp; &nbsp;
    {/*{props.closable &&
      <button type="button" onClick={props.onClose}>
        <span>×</span>
      </button>}*/}
  </div>;

export default Message;
