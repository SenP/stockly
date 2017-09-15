import React, { PureComponent } from 'react';
import { instanceOf, func, bool, string } from 'prop-types';
import { Button, FormControl } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import { Stock, Watchlist } from '../../../services';
import Message from '../../common/Message';

const msgClasses = {
	error: 'msg text-center text-danger',
	info: 'msg text-center text-info'
};

export default class EditStockForm extends PureComponent {
	static propTypes = {
		stock: instanceOf(Stock).isRequired,
		watchlist: instanceOf(Watchlist).isRequired,
		onChange: func.isRequired,
		onSave: func.isRequired,
		onClose: func.isRequired,
		saving: bool,
		error: string
	};

	state = { stock: this.props.stock, error: '' };

	isFormValid = () => {
		let { stock } = this.state;
		return stock.unitsOwned.trim() !== '' && stock.avgPrice.trim() !== '';
	};

	handleChange = ({ target }) => {
		this.setState(
			prevState => ({
				stock: Object.assign(new Stock(), prevState.stock, {
					[target.name]: target.value.trim()
				})
			}),
			() => this.props.onChange(this.state.stock)
		);
	};

	submitForm = evt => {
		this.setState({ error: '' });
		const error = this.props.onSave(this.state.watchlist);
		error && this.setState({ error });
	};

	closeForm = () => {
		let { stock, onClose } = this.props;
		this.setState(() => ({
			stock: Object.assign(new Stock(), stock),
			msg: '',
			msgClass: ''
		}));
		onClose();
	};

	render = () => {
		let { saving, stock, error = null } = this.props;
		let msg = saving ? 'Saving...please wait.' : error;
		let msgClass = saving ? msgClasses.info : msgClasses.error;

		return (
			<tr>
				<td>{stock.code}</td>
				<td className="number-field">
					<FormControl
						type="text"
						name="unitsOwned"
						bsSize="small"
						value={stock.unitsOwned}
						onChange={this.handleChange}
						maxLength={9}
						autoFocus
					/>
				</td>
				<td className="number-field">
					<FormControl
						type="text"
						name="avgPrice"
						bsSize="small"
						value={stock.avgPrice}
						onChange={this.handleChange}
						maxLength={8}
					/>
				</td>
				<td colSpan="7">
					<span className="center-block">
						<Button
							bsSize="small"
							bsStyle="success"
							style={{ marginRight: '10px' }}
							onClick={this.submitForm}
							disabled={saving}
						>
							<FontAwesome name="check" />
						</Button>

						<Button bsSize="small" bsStyle="danger" onClick={this.closeForm} disabled={saving}>
							<FontAwesome name="close" />
						</Button>

						<span style={{ textAlign: 'center', marginTop: '10px' }}>
							<Message msgtext={msg} msgclass={msgClass} />
						</span>
					</span>
				</td>
			</tr>
		);
	};
}
