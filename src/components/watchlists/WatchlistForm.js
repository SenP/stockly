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

class WatchlistForm extends PureComponent {
	static propTypes = {
		watchlist: instanceOf(Watchlist).isRequired,
		onSave: func.isRequired,
		onClose: func.isRequired,
		saving: bool,
		error: string
	};

	state = { watchlist: this.props.watchlist, error: '' };

	handleChange = ({ target }) => {
		this.setState(prevState => ({
			watchlist: Object.assign(new Watchlist(), prevState.watchlist, {
				[target.name]: target.value.trim()
			})
		}));
	};

	isFormValid = () => this.state.watchlist.name.trim() !== '';

	submitForm = evt => {
		this.setState({ error: '' });
		const error = this.props.onSave(this.state.watchlist);
		error && this.setState({ error });
	};

	closeForm = () => {
		const { watchlist, onClose } = this.props;
		this.setState(() => ({
			watchlist,
			msg: '',
			msgClass: ''
		}));
		onClose();
	};

	render = () => {
		const formStyle = {
			background: '#222230',
			border: '0px',
			padding: '0px'
		};

		const { saving } = this.props;
		const { watchlist } = this.state;
		const error = this.state.error || this.props.error;
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
				<Form onSubmit={this.submitForm}>
					<FormGroup>
						<ControlLabel> Name: </ControlLabel>
						<FormControl
							type="text"
							name="name"
							bsSize="small"
							value={watchlist.name}
							onChange={this.handleChange}
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
							onChange={this.handleChange}
							maxLength={50}
						/>
					</FormGroup>
					<ButtonToolbar>
						<Button
							bsStyle="success"
							bsSize="small"
							onClick={this.submitForm}
							disabled={!this.isFormValid() || saving}
						>
							Submit
						</Button>
						<Button bsStyle="danger" bsSize="small" onClick={this.closeForm} disabled={saving}>
							Cancel
						</Button>
					</ButtonToolbar>
				</Form>
				<div style={{ textAlign: 'center', marginTop: '10px' }}>
					<Message msgtext={msg} msgclass={msgClass} />
				</div>
			</div>
		);
	};
}

export default WatchlistForm;
