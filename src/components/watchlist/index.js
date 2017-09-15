import React, { PureComponent } from 'react';
import { instanceOf } from 'prop-types';
// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as watchlistActions from '../../redux/actions/watchlistActions';
import * as opsActions from '../../redux/actions/opsActions';

import selectSelectedWatchlist from '../../redux/selectors/selectSelectedWatchlist';
import selectOps from '../../redux/selectors/selectOps';
import { STOCK } from '../../redux/actions/scopes';

import { Panel } from 'react-bootstrap';

import { Stock, Watchlist, WatchlistService } from '../../services';
import StocksList from './StocksList';
import AddStockPanel from './AddStockPanel';
import Header from './WatchlistHeader';

export class WatchlistContainer extends PureComponent {
	static propTypes = {
		watchlist: instanceOf(Watchlist)
	};

	onAddClick = () => {
		this.props.actions.initOp(STOCK, { watchlist: this.props.watchlist, op: 'ADD' });
	};

	onEditClick = stock => {
		let editedStock = Object.assign(new Stock(), stock);
		this.props.actions.initOp(STOCK, { watchlist: this.props.watchlist, stock: editedStock, op: 'EDIT' });
	};

	onDeleteClick = stk => {
		let { stock, watchlist } = this.state;
		this.setState(
			() => ({
				deleting: true
			}),
			() => this.props.actions.initOp(stock, watchlist, 'DELETE')
		);
	};

	onSave = watchlist => {
		let valid = WatchlistService.validateWatchlist(watchlist);
		if (valid.status === 'error') {
			return valid.msg;
		}
		this.props.opState.adding
			? this.props.actions.createWatchlist(watchlist)
			: this.props.actions.editWatchlist(watchlist);
	};

	onDelete = (stock, watchlist) => {
		this.props.actions.deleteStock(stock, watchlist);
	};

	onChange = editedStock => {
		this.props.actions.updateOp(STOCK, { watchlist: this.props.watchlist, stock: editedStock, op: 'EDIT' });
	};

	onCancel = () => {
		let { removeOp } = this.props.actions;
		let stock = this.props.opState.editedStock;
		let { watchlist } = this.props;
		removeOp(STOCK, { op: 'ADD' });
		removeOp(STOCK, { stock, watchlist, op: 'EDIT' });
		removeOp(STOCK, { stock, watchlist, op: 'DELETE' });
	};

	render() {
		const { watchlist } = this.props;

		if (!watchlist) return null;

		const TitlePanel = (
			<Panel
				header={<Header watchlist={watchlist} />}
				bsStyle="primary"
				className="panel-watchlist text-center"
			/>
		);

		const emptylistMsg = (
			<div className="jumbotron text-center">
				<h3> Watchlist is empty! </h3>
			</div>
		);

		return (
			<div>
				{TitlePanel}
				<div>
					{watchlist && watchlist.stocks.length === 0 && emptylistMsg}
					<AddStockPanel watchlist={watchlist} />
				</div>

				<StocksList
					watchlist={watchlist}
					onEditClick={this.onEditClick}
					onChange={this.onChange}
					onSave={this.onSave}
					onDeleteClick={this.onDeleteClick}
					onDelete={this.onDelete}
					onCancel={this.onCancel}
				/>

				<div className="pull-right">
					<small> Price data from Google Finance (delayed and randomized). </small>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	let watchlist = selectSelectedWatchlist(state);
	if (!watchlist) return {};
	let stocksOp = selectOps(state, 'stock');
	let stocks = watchlist.stocks;
	let stocksWithOp = stocks.map(stock => {
		let opState;
		let stockOp = stocksOp.filter(op => op.stock.code === stock.code && op.watchlist.id === watchlist.id)[0];
		if (stockOp) {
			let { op, status, error, stock: editedStock } = stockOp;
			opState = {
				editedStock,
				adding: op === 'CREATE',
				editing: op === 'EDIT',
				deleting: op === 'DELETE',
				saving: status === 'pending' ? true : false,
				error
			};
		} else {
			opState = {
				editedStock: stock,
				adding: false,
				editing: false,
				deleting: false,
				saving: false,
				error: null
			};
		}
		return Object.assign(new Stock(), { ...stock, opState });
	});

	return {
		watchlist: Object.assign(new Watchlist(), watchlist, { stocks: stocksWithOp })
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators({ ...opsActions, ...watchlistActions }, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(WatchlistContainer);
