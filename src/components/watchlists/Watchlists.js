import React from 'react';
import { arrayOf, instanceOf, func } from 'prop-types';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

import { Watchlist } from '../../services';

Watchlists.propTypes = {
	watchlists: arrayOf(instanceOf(Watchlist)),
	selected: instanceOf(Watchlist),
	onClick: func
};

function Watchlists({ watchlists = [], selected = null, onClick }) {
	return (
		<ListGroup>
			{watchlists.map(watchlist => (
				<ListGroupItem
					key={watchlist.id}
					active={selected && watchlist.id === selected.id}
					onClick={() => onClick(watchlist)}
				>
					{watchlist.name}
				</ListGroupItem>
			))}
		</ListGroup>
	);
}

export default Watchlists;
