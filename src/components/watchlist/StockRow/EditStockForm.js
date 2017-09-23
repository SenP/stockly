import React, { PureComponent } from 'react';
import { instanceOf, func, bool, string } from 'prop-types';
import { Button, FormControl } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
// deps
import { Stock, Watchlist } from '../../../services';
import Message from '../../common/Message';

const msgClasses = {
	error: 'msg text-center text-danger',
	info: 'msg text-center text-info'
};
const ButtonStyle = { marginRight: '10px' };
const MsgStyle = { textAlign: 'center', marginTop: '10px' };

class EditStockForm extends PureComponent {
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
		const { stock } = this.state;
		return stock.unitsOwned && stock.unitsOwned > 0 && stock.avgPrice && stock.avgPrice > 0;
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
		const error = this.props.onSave(this.state.stock);
		error && this.setState({ error });
	};

	closeForm = () => {
		const { stock, onClose } = this.props;
		this.setState({
			stock: Object.assign(new Stock(), stock),
			error: ''
		});
		onClose();
	};

	render = () => {
		const { saving, stock } = this.props;
		const msg = saving ? 'Saving...please wait.' : this.state.error || this.props.error;
		const msgClass = saving ? msgClasses.info : msgClasses.error;

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
							style={ButtonStyle}
							onClick={this.submitForm}
							disabled={saving || !this.isFormValid()}
						>
							<FontAwesome name="check" />
						</Button>

						<Button bsSize="small" bsStyle="danger" onClick={this.closeForm} disabled={saving}>
							<FontAwesome name="close" />
						</Button>

						<span style={MsgStyle}>
							<Message msgtext={msg} msgclass={msgClass} />
						</span>
					</span>
				</td>
			</tr>
		);
	};
}

export default EditStockForm;
