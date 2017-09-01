import React from 'react';
import Dashboard from '../dashboard';
import Watchlist from '../watchlist';

const contentStyle = {
	margin: '0px',
	padding: '10px 10px'
};

function Content() {
	return (
		<div style={contentStyle}>
			<Watchlist />
			<Dashboard />
		</div>
	);
}

export default Content;
