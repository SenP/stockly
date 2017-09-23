import { SELECT_WATCHLIST } from '../actions/actionTypes.js';
import initialState from '../initialState';

function selectedWatchlistReducer(selectedWatchlistId = initialState.selectedWatchlistId, { type, watchlist }) {
	switch (type) {
		case SELECT_WATCHLIST:
			return (watchlist && watchlist.id) || null;
		default:
			return selectedWatchlistId;
	}
}

export default selectedWatchlistReducer;
