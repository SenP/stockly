import React, { PureComponent } from 'react';
import { instanceOf, bool, string, func } from 'prop-types';
import { ButtonToolbar, Button, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
// deps
import { Watchlist } from '../../services';
import Message from '../common/Message';

const msgClasses = {
	error: 'msg text-center text-danger',
	info: 'msg text-center text-info'
};

const formStyle = {
	background: '#222230',
	border: '0px',
	padding: '0px'
};

WatchlistForm.propTypes = {
	watchlist: instanceOf(Watchlist).isRequired,
	onChange: func.isRequired,
	onSave: func.isRequired,
	onClose: func.isRequired,
	saving: bool,
	error: string
};

function WatchlistForm({ watchlist, saving = false, error = null, onChange, onSave, onClose }) {
	const msg = saving ? 'Saving...please wait.' : error;
	const msgClass = saving ? msgClasses.info : msgClasses.error;

	const formTitle = (
		<span style={{ textAlign: 'center' }}>
			<h4>{!watchlist.id ? 'Create Watchlist' : 'Edit Watchlist'}</h4>
		</span>
	);

	return (
		<div style={formStyle}>
			{formTitle}
			<Form onSubmit={onSave}>
				<FormGroup>
					<ControlLabel> Name: </ControlLabel>
					<FormControl
						type="text"
						name="name"
						bsSize="small"
						value={watchlist.name}
						onChange={onChange}
						maxLength={15}
						autoFocus
					/>
				</FormGroup>
				<FormGroup>
					<ControlLabel> Description: </ControlLabel>
					<FormControl
						type="textarea"
						name="description"
						bsSize="small"
						value={watchlist.description}
						onChange={onChange}
						maxLength={50}
					/>
				</FormGroup>
				<ButtonToolbar>
					<Button bsStyle="success" bsSize="small" onClick={onSave} disabled={!this.isFormValid() || saving}>
						Submit
					</Button>
					<Button bsStyle="danger" bsSize="small" onClick={onClose} disabled={saving}>
						Cancel
					</Button>
				</ButtonToolbar>
			</Form>
			<div style={{ textAlign: 'center', marginTop: '10px' }}>
				<Message msgtext={msg} msgclass={msgClass} />
			</div>
		</div>
	);
}

export default WatchlistForm;
