import React from "react";
import { bool, func } from "prop-types";
import { Button, ButtonToolbar } from "react-bootstrap";
import FontAwesome from "react-fontawesome";

const headerStyle = {
  fontSize: "1.8rem"
};

Header.propTypes = {
  showAdd: bool,
  showEdit: bool,
  onAdd: func,
  onEdit: func,
  onDelete: func
};

function Header({ showAdd, showEdit, onAdd, onEdit, onDelete }) {
  return (
    <span style={headerStyle}>
      <span>
        <FontAwesome name="eye" />
        &nbsp; Watchlists &nbsp;
      </span>
      <ButtonToolbar className="pull-right">
        {showAdd &&
          <Button bsSize="xsmall" bsStyle="success" onClick={onAdd}>
            <FontAwesome name="plus" />
          </Button>}
        {showEdit &&
          <Button bsSize="xsmall" bsStyle="warning" onClick={onEdit}>
            <FontAwesome name="pencil-square-o" />
          </Button>}
        {showEdit &&
          <Button bsSize="xsmall" bsStyle="danger" onClick={onDelete}>
            <FontAwesome name="trash-o" />
          </Button>}
      </ButtonToolbar>
    </span>
  );
}

export default Header;
