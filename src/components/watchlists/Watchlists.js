import React from 'react';
import { objectOf, instanceOf, func } from 'prop-types';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

import { Watchlist } from '../../services';

Watchlists.propTypes = {
	items: objectOf(instanceOf(Watchlist)),
	selectedItem: instanceOf(Watchlist),
	onClick: func
};

function Watchlists({ items, selectedItem, onClick }) {
	return (
		<ListGroup>
			{Object.values(items).map(wl =>
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
