import React, { Component } from 'react';
import { instanceOf, object } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import selectStockOp from '../../../redux/selectors/selectStockOp';

import { Stock, Watchlist, WatchlistService } from '../../../services';
import StockView from './StockView';
import EditStockForm from './EditStockForm';
import DeleteStockForm from './DeleteStockForm';
import * as watchlistActions from '../../../redux/actions/watchlistActions';

class StockRow extends Component {
	static propTypes = {
		stock: instanceOf(Stock).isRequired,
		watchlist: instanceOf(Watchlist).isRequired,
		stockAsyncOp: object
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

	componentDidMount() {
		this.setCompState(this.props);
	}

	componentWillReceiveProps(newProps) {
		this.setCompState(newProps);
	}

	resetOpStatus = () => {
		let { stock, watchlist } = this.state;
		let { removeAsyncOp } = this.props.actions;
		removeAsyncOp(stock, watchlist, 'EDIT');
		removeAsyncOp(stock, watchlist, 'DELETE');
	};

	setCompState = props => {
		let { stockAsyncOp, stock, watchlist } = props;
		if (stockAsyncOp) {
			let editing = stockAsyncOp.op === 'EDIT' ? true : false;
			let editedStock = editing ? stockAsyncOp.stock : stock;
			let saving = stockAsyncOp.status === 'pending' ? true : false;
			let error = stockAsyncOp.error;
			this.setState(() => ({
				stock,
				watchlist,
				editedStock,
				editing,
				deleting: !editing,
				saving,
				error
			}));
		} else {
			this.setState(prevState => {
				return {
					stock,
					watchlist,
					editedStock: stock,
					editing: false,
					deleting: false,
					saving: false,
					error: null
				};
			});
		}
	};

	onEditClick = () => {
		let { stock, watchlist } = this.state;
		this.setState(
			() => ({
				editing: true
			}),
			() => this.props.actions.initAsyncOp(stock, watchlist, 'EDIT')
		);
	};

	onSave = stock => {
		this.setState(
			() => ({
				editedStock: stock
			}),
			() => this.props.actions.editStock(stock, this.state.watchlist)
		);
	};

	handleChange = editedStock => {
		this.props.actions.updateAsyncOp(this.state.watchlist, editedStock, 'EDIT');
	};

	onValidate = stock => {
		return WatchlistService.validateStock(this.state.watchlist, stock, false);
	};

	onDeleteClick = stk => {
		let { stock, watchlist } = this.state;
		this.setState(
			() => ({
				deleting: true
			}),
			() => this.props.actions.initAsyncOp(stock, watchlist, 'DELETE')
		);
	};

	onDelete = (stock, watchlist) => {
		this.props.actions.deleteStock(stock, watchlist);
	};

	onCancel = () => {
		this.setState({
			editing: false,
			deleting: false,
			saving: false,
			error: null
		});
		this.resetOpStatus();
	};

	render() {
		let { stock, watchlist, editedStock, editing, deleting, saving, error } = this.state;

		return (
			(!editing &&
				!deleting &&
				<StockView stock={stock} onEdit={this.onEditClick} onDelete={this.onDeleteClick} />) ||
			(editing &&
				<EditStockForm
					stock={editedStock}
					watchlist={watchlist}
					saving={saving}
					error={error}
					onChange={this.handleChange}
					onValidate={this.onValidate}
					onSave={this.onSave}
					onClose={this.onCancel}
				/>) ||
			(deleting &&
				<DeleteStockForm
					stock={stock}
					watchlist={watchlist}
					saving={saving}
					onDelete={this.onDelete}
					onClose={this.onCancel}
				/>)
		);
	}
}

function mapStateToProps(state, ownProps) {
	return {
		stockAsyncOp:
			selectStockOp(state, ownProps.stock, ownProps.watchlist, 'EDIT') ||
			selectStockOp(state, ownProps.stock, ownProps.watchlist, 'DELETE')
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(watchlistActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(StockRow);
