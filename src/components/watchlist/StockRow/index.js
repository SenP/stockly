import React, { PureComponent } from 'react';
import { instanceOf, func, object } from 'prop-types';

import { Stock, Watchlist } from '../../../services';
import StockView from './StockView';
import EditStockForm from './EditStockForm';
import DeleteStockForm from './DeleteStockForm';

class StockRow extends PureComponent {
	static propTypes = {
		stock: object.isRequired,
		watchlist: instanceOf(Watchlist).isRequired,
		onEditClick: func.isRequired,
		onDeleteClick: func.isRequired,
		onChange: func.isRequired,
		onSave: func.isRequired,
		onDelete: func.isRequired,
		onCancel: func.isRequired
	};

	state = {
		stock: this.props.stock,
		watchlist: this.props.watchlist,
		editedStock: this.props.stock,
		editing: false,
		deleting: false,
		saving: false,
		error: null
	};

	handleChange = editedStock => {
		this.props.onChange(editedStock);
	};

	submitForm = evt => {
		this.setState({ error: '' });
		const error = this.props.onSave(this.state.watchlist);
		error && this.setState({ error });
	};

	closeForm = () => {
		let { watchlist, onClose } = this.props;
		this.setState(() => ({
			watchlist,
			msg: '',
			msgClass: ''
		}));
		onClose();
	};

	render() {
		let { stock, watchlist } = this.props;
		let { editedStock, editing, deleting, saving, error } = stock.opState;

		return (
			(!editing &&
			!deleting && (
				<StockView stock={stock} onEdit={this.props.onEditClick} onDelete={this.props.onDeleteClick} />
			)) ||
			(editing && (
				<EditStockForm
					stock={editedStock}
					watchlist={watchlist}
					saving={saving}
					error={error}
					onChange={this.handleChange}
					onSave={this.props.onSave}
					onClose={this.props.onCancel}
				/>
			)) ||
			(deleting && (
				<DeleteStockForm
					stock={stock}
					watchlist={watchlist}
					saving={saving}
					error={error}
					onDelete={this.props.onDelete}
					onClose={this.props.onCancel}
				/>
			))
		);
	}
}

export default StockRow;
