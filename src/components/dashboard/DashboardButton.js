import React from 'react';
import { Button } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

function DashboardButton({ onClick }) {
	return (
		<div style={{ margin: '10px 0px' }}>
			<Button bsStyle="success" block onClick={onClick}>
				<span className="pull-left">
					<FontAwesome name="bar-chart" size="lg" />
					<span style={{ margin: '20px', fontSize: '1.8rem' }}>Dashboard</span>
				</span>
			</Button>
		</div>
	);
}

export default DashboardButton;
