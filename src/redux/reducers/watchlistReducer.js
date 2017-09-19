import * as types from '../actions/actionTypes.js';
import { Watchlist as WatchlistModel } from '../../services';
import stocksReducer from './stocksReducer';

export default function watchlistReducer(watchlist = { stocks: {} }, action) {
	switch (action.type) {
		case types.SAVE_WATCHLIST_SUCCESS: {
			let stocksByCode = watchlist.stocksByCode || {};
			let newWatchlist = Object.assign(new WatchlistModel(), action.watchlist, {
				stocksByCode
			});
			// delete newWatchlist.stocks;
			return newWatchlist;
		}

		case types.FETCH_QUOTES_SUCCESS:
		case types.SAVE_STOCK_SUCCESS:
		case types.DELETE_STOCK_SUCCESS: {
			let newWatchlist = Object.assign(new WatchlistModel(), watchlist, {
				stocksByCode: stocksReducer(watchlist.stocksByCode, action)
			});
			// delete newWatchlist.stocks;
			return newWatchlist;
		}

		default:
			return watchlist;
	}
}
