import * as types from '../actions/actionTypes.js';
import initialState from '../initialState';
import watchlistReducer from './watchlistReducer';

export default function(state = initialState.watchlistsById, action) {
	switch (action.type) {
		case types.LOAD_WATCHLISTS_SUCCESS:
			return loadWatchlists(action.watchlists);

		case types.FETCH_QUOTES_SUCCESS: {
			let newState = {};
			for (const id in state) {
				newState[id] = watchlistReducer(state[id], action);
			}
			return newState;
		}

		case types.SAVE_WATCHLIST_SUCCESS:
		case types.SAVE_STOCK_SUCCESS:
		case types.DELETE_STOCK_SUCCESS:
			return saveWatchlist(state, action);

		case types.DELETE_WATCHLIST_SUCCESS:
			return deleteWatchlist(state, action);

		default:
			return state;
	}
}

function loadWatchlists(watchlists = []) {
	// Transform watchlists array into hash
	return watchlists.reduce((watchlistsHash, wl) => {
		wl.stocksById = wl.stocks.reduce((stocksHash, stock) => {
			stocksHash[stock.code] = stock;
			return stocksHash;
		}, {});
		watchlistsHash[wl.id] = wl;
		return watchlistsHash;
	}, {});
}

function saveWatchlist(state, action) {
	let watchlist = state[action.watchlist.id] || undefined;
	return Object.assign({}, state, { [action.watchlist.id]: watchlistReducer(watchlist, action) });
}

function deleteWatchlist(state, action) {
	let tempState = { ...state };
	delete tempState[action.watchlist.id];
	return { ...tempState };
}
