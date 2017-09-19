import React from 'react';

const sidebarStyle = {
	padding: '0px 0px',
	margin: '0px'
};

const headerStyle = {
	color: 'white',
	background: 'black',
	minHeight: '40px',
	textAlign: 'center',
	padding: '5px',
	margin: '0px -5px'
};

function Sidebar({ children }) {
	return (
		<div style={sidebarStyle}>
			<h3 style={headerStyle}>Stockly</h3>
			{children}
		</div>
	);
}

export default Sidebar;
