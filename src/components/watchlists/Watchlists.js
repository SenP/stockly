import React from "react";
import { arrayOf, instanceOf, func } from "prop-types";
import { ListGroup, ListGroupItem } from "react-bootstrap";

import { Watchlist } from "../../services";

Watchlists.propTypes = {
  items: arrayOf(instanceOf(Watchlist)),
  selectedItem: instanceOf(Watchlist),
  onClick: func
};

function Watchlists({ items, selectedItem, onClick }) {
  return (
    <ListGroup>
      {items.map(wl =>
        <ListGroupItem
          key={wl.id}
          active={selectedItem && wl.id === selectedItem.id}
          onClick={() => onClick(wl)}
        >
          {wl.name}
        </ListGroupItem>
      )}
    </ListGroup>
  );
}

export default Watchlists;
