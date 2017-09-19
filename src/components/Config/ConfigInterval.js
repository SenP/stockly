import React from 'react';
import { number, func, array } from 'prop-types';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

const formStyle = {
	background: '#222230',
	border: '0px',
	padding: '0px'
};

ConfigInterval.propTypes = {
	intervals: array.isRequired,
	interval: number.isRequired,
	onChange: func.isRequired
};

function ConfigInterval({ intervals, interval = 60, onChange }) {
	const changeInterval = ({ target }) => onChange(parseInt(target.value, 10));
	return (
		<div style={formStyle}>
			<FormGroup>
				<ControlLabel> Quotes update interval: </ControlLabel>
				<FormControl
					componentClass="select"
					name="interval"
					bsSize="small"
					value={interval}
					onChange={changeInterval}
				>
					{intervals.map(interval => (
						<option key={interval[0]} value={interval[0]}>
							{interval[1]}
						</option>
					))}
				</FormControl>
			</FormGroup>
		</div>
	);
}

export default ConfigInterval;
