import React from "react";
import { Button, ButtonToolbar } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

const headerStyle = {
  fontSize: "1.8rem",
};

const Header = props => (
  <span style={headerStyle}>
    <span >
      <FontAwesome name="eye" />
        &nbsp; Watchlists &nbsp;
    </span>
    {props.showButtons &&
      <ButtonToolbar className="pull-right">
        <Button bsSize="xsmall" bsStyle="success" onClick={props.onAdd}>
          <FontAwesome name="plus" />
        </Button>
        <Button bsSize="xsmall" bsStyle="warning" onClick={props.onEdit}>
          <FontAwesome name="pencil-square-o" />
        </Button>
        <Button bsSize="xsmall" bsStyle="danger" onClick={props.onDelete}>
          <FontAwesome name="trash-o" />
        </Button>
      </ButtonToolbar>}  
  </span>
);

export default Header;
