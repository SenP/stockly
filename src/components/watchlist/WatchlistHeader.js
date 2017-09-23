import React from 'react';
import { instanceOf } from 'prop-types';
import { Watchlist } from '../../services';

const headerStyle = {
	fontSize: '1.5rem',
	fontWeight: '600'
};

Header.propTypes = {
	watchlist: instanceOf(Watchlist)
};

export default function Header({ watchlist = { name: '', description: '' } }) {
	return (
		<span style={headerStyle}>
			<div>
				<h3>{watchlist.name}</h3>
				<h5>{watchlist.description}</h5>
			</div>
		</span>
	);
}
