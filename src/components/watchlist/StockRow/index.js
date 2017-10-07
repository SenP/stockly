import React, { Component } from 'react';
import { instanceOf, func, object, bool, string } from 'prop-types';
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

class StockRow extends Component {
	static propTypes = {
		stock: instanceOf(Stock).isRequired,
		watchlist: instanceOf(Watchlist).isRequired,
		onSave: func.isRequired,
		onDelete: func.isRequired,
		actions: object,
		editedStock: instanceOf(Stock),
		editing: bool,
		deleting: bool,
		saving: bool,
		error: string
	};

	static defaultProps = {
		editedStock: null,
		editing: false,
		deleting: false,
		saving: false,
		error: null
	};

	state = {
		editedStock: this.props.editedStock,
		editing: this.props.editing,
		deleting: this.props.deleting,
		saving: this.props.saving,
		error: this.props.error
	};

	componentWillReceiveProps(newProps) {
		if (newProps.stock === this.props.stock) {
			const { editedStock, editing, deleting, saving, error } = newProps;
			this.setState({
				editedStock,
				editing,
				deleting,
				saving,
				error
			});
		}
	}

	componentWillUnmount() {
		// save local state to store
		const { editing, deleting, editedStock } = this.state;
		const op = editing ? 'EDIT' : deleting ? 'DELETE' : null;
		if (op) {
			const { watchlist, actions } = this.props;
			actions.updateOp(STOCK, { watchlist, stock: editedStock, op });
		}
	}

	onEditClick = () => {
		const editedStock = Object.assign(new Stock(), this.props.stock);
		this.setState({ editedStock, editing: true });
	};

	onDeleteClick = () => this.setState({ editedStock: this.props.stock, deleting: true });

	onChange = ({ target }) =>
		// save form changes in local state
		this.setState(prevState => ({
			editedStock: Object.assign(new Stock(), prevState.editedStock, {
				[target.name]: target.value.trim()
			})
		}));

	isFormValid = () => {
		const { editedStock } = this.state;
		return editedStock.unitsOwned && editedStock.unitsOwned > 0 && editedStock.avgPrice && editedStock.avgPrice > 0;
	};

	onSave = evt => {
		this.setState({ error: '' });
		const error = this.props.onSave(this.state.editedStock);
		error && this.setState({ error });
	};

	onDelete = () => {
		this.setState({ error: '' });
		const error = this.props.onDelete(this.props.stock);
		error && this.setState({ error });
	};

	onCancel = () => {
		const { removeOp } = this.props.actions;
		const { stock, watchlist } = this.props;
		this.setState({
			editedStock: null,
			editing: false,
			deleting: false,
			saving: false,
			error: null
		});
		removeOp(STOCK, { stock, watchlist, op: 'EDIT' });
		removeOp(STOCK, { stock, watchlist, op: 'DELETE' });
	};

	render() {
		const { stock, watchlist } = this.props;
		const { editedStock, editing, deleting, saving, error } = this.state;

		return (
			(!editing &&
			!deleting && <StockView stock={stock} onEdit={this.onEditClick} onDelete={this.onDeleteClick} />) ||
			(editing && (
				<EditStockForm
					stock={editedStock}
					onChange={this.onChange}
					onSave={this.onSave}
					onClose={this.onCancel}
					isFormValid={this.isFormValid()}
					saving={saving}
					error={error}
				/>
			)) ||
			(deleting && (
				<DeleteStockForm
					stock={editedStock}
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
	const { watchlist, stock } = ownProps;
	const stockOp =
		selectOps(state, STOCK, { stock, watchlist, op: 'EDIT' }) ||
		selectOps(state, STOCK, { stock, watchlist, op: 'DELETE' });
	if (stockOp) {
		const { op, status, error, stock: editedStock } = stockOp;
		return {
			editedStock,
			editing: op === 'EDIT',
			deleting: op === 'DELETE',
			saving: status === 'pending' ? true : false,
			error
		};
	}
	// return {};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(opsActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(StockRow);
