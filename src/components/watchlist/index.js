import React, { PureComponent } from 'react';
import { instanceOf } from 'prop-types';
import { Panel } from 'react-bootstrap';
// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as watchlistActions from '../../redux/actions/watchlistActions';
import selectSelectedWatchlist from '../../redux/selectors/selectSelectedWatchlist';
// deps
import { Watchlist, WatchlistService } from '../../services';
import AddStockPanel from './AddStockPanel';
import StocksList from './StocksList';
import Header from './WatchlistHeader';

class WatchlistContainer extends PureComponent {
	static propTypes = {
		watchlist: instanceOf(Watchlist)
	};

	onSaveStock = (stock, isAdding) => {
		const { watchlist, actions } = this.props;
		const valid = WatchlistService.validateStock(watchlist, stock, isAdding);
		if (valid.status === 'error') {
			return valid.msg;
		}
		isAdding ? actions.addStock(stock, watchlist) : actions.editStock(stock, watchlist);
	};

	onDeleteStock = stock => {
		this.props.actions.deleteStock(stock, this.props.watchlist);
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
					{watchlist && Object.values(watchlist.stocksByCode).length === 0 && emptylistMsg}
					<AddStockPanel watchlist={watchlist} onSave={this.onSaveStock} />
				</div>

				<StocksList watchlist={watchlist} onSave={this.onSaveStock} onDelete={this.onDeleteStock} />

				<div className="pull-right">
					<small> Price data from Google Finance (delayed and randomized). </small>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const watchlist = selectSelectedWatchlist(state);
	if (!watchlist) return {};
	return {
		watchlist
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(watchlistActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(WatchlistContainer);
