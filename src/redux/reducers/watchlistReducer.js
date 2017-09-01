import * as types from '../actions/actionTypes.js';
import { Watchlist as WatchlistModel } from '../../services';
import stocksReducer from './stocksReducer';

export default function watchlistReducer(state = { stocks: {} }, action) {
	switch (action.type) {
		case types.SAVE_WATCHLIST_SUCCESS: {
			let newWatchlist = Object.assign(new WatchlistModel(), action.watchlist, {
				stocksByCode: state.stocksByCode
			});
			delete newWatchlist.stocks;
			return newWatchlist;
		}

		case types.FETCH_QUOTES_SUCCESS:
		case types.SAVE_STOCK_SUCCESS:
		case types.DELETE_STOCK_SUCCESS: {
			let newWatchlist = Object.assign(new WatchlistModel(), state, {
				stocksByCode: stocksReducer(state.stocksByCode, action)
			});
			delete newWatchlist.stocks;
			return newWatchlist;
		}

		default:
			return state;
	}
}
