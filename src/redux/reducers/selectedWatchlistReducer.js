import * as actions from '../actions/actionTypes.js';
import initialState from '../initialState';

export default function(state = initialState.selectedWatchlistId, action) {
	switch (action.type) {
		case actions.SELECT_WATCHLIST:
			return action.watchlistId;
		default:
			return state;
	}
}