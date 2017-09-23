import * as types from '../actions/actionTypes.js';
import { Watchlist as WatchlistModel } from '../../services';
import stocksReducer from './stocksReducer';

function watchlistReducer(watchlist = { stocks: {} }, action) {
	switch (action.type) {
		case types.SAVE_WATCHLIST_SUCCESS: {
			const stocksByCode = watchlist.stocksByCode || {};
			const newWatchlist = Object.assign(new WatchlistModel(), action.watchlist, {
				stocksByCode
			});
			return newWatchlist;
		}

		case types.FETCH_QUOTES_SUCCESS:
		case types.SAVE_STOCK_SUCCESS:
		case types.DELETE_STOCK_SUCCESS: {
			const newWatchlist = Object.assign(new WatchlistModel(), watchlist, {
				stocksByCode: stocksReducer(watchlist.stocksByCode, action)
			});
			return newWatchlist;
		}

		default:
			return watchlist;
	}
}

export default watchlistReducer;