import React from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";

const Watchlists = props =>
  !props.hidden &&
  <ListGroup>
    {props.items.map(wl => (
      <ListGroupItem
        key={wl.id}
        active={wl === props.selectedItem}
        onClick={() => props.onClick(wl)}
      >
        {wl.name}
      </ListGroupItem>
    ))}
  </ListGroup>;

export default Watchlists;
