import React, { PureComponent } from 'react';
import { instanceOf, func, object } from 'prop-types';
// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as opsActions from '../../../redux/actions/opsActions';
import selectOps from '../../../redux/selectors/selectOps';
import { STOCK } from '../../../redux/actions/scopes';
// deps
import { Stock, Watchlist } from '../../../services';
import StockView from './StockView';
import EditStockForm from './EditStockForm';
import DeleteStockForm from './DeleteStockForm';

class StockRow extends PureComponent {
	static propTypes = {
		stock: object.isRequired,
		watchlist: instanceOf(Watchlist).isRequired,
		onSave: func.isRequired,
		onDelete: func.isRequired,
		opState: object,
		actions: object
	};

	static defaultProps = {
		opState: {
			editedStock: null,
			editing: false,
			deleting: false,
			saving: false,
			error: null
		}
	};

	onEditClick = () => {
		let { watchlist, stock, actions } = this.props;
		let editedStock = Object.assign(new Stock(), stock);
		actions.initOp(STOCK, { watchlist, stock: editedStock, op: 'EDIT' });
	};

	onDeleteClick = () => {
		let { watchlist, stock, actions } = this.props;
		actions.initOp(STOCK, { watchlist, stock, op: 'DELETE' });
	};

	onChange = editedStock => {
		let { watchlist, actions } = this.props;
		actions.updateOp(STOCK, { watchlist, stock: editedStock, op: 'EDIT' });
	};

	submitForm = editedStock => {
		return this.props.onSave(editedStock, false);
	};

	onDelete = () => {
		this.setState({ error: '' });
		const error = this.props.onDelete(this.props.stock);
		error && this.setState({ error });
	};

	onCancel = () => {
		let { removeOp } = this.props.actions;
		let { stock, watchlist } = this.props;
		removeOp(STOCK, { stock, watchlist, op: 'EDIT' });
		removeOp(STOCK, { stock, watchlist, op: 'DELETE' });
	};

	render() {
		let { stock, watchlist } = this.props;
		let { editedStock, editing, deleting, saving, error } = this.props.opState;

		return (
			(!editing &&
			!deleting && <StockView stock={stock} onEdit={this.onEditClick} onDelete={this.onDeleteClick} />) ||
			(editing && (
				<EditStockForm
					stock={editedStock}
					watchlist={watchlist}
					saving={saving}
					error={error}
					onChange={this.onChange}
					onSave={this.submitForm}
					onClose={this.onCancel}
				/>
			)) ||
			(deleting && (
				<DeleteStockForm
					stock={stock}
					watchlist={watchlist}
					saving={saving}
					onDelete={this.onDelete}
					onClose={this.onCancel}
				/>
			))
		);
	}
}

function mapStateToProps(state, ownProps) {
	let { watchlist, stock } = ownProps;
	let stockOp =
		selectOps(state, 'stock', { stock, watchlist, op: 'EDIT' }) ||
		selectOps(state, 'stock', { stock, watchlist, op: 'DELETE' });
	let opState;
	if (stockOp) {
		let { op, status, error, stock: editedStock } = stockOp;
		opState = {
			editedStock,
			editing: op === 'EDIT',
			deleting: op === 'DELETE',
			saving: status === 'pending' ? true : false,
			error
		};
	}
	return {
		opState
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(opsActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(StockRow);
