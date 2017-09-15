import * as actions from './actionTypes';

export function loadWatchlists() {
	return {
		type: actions.LOAD_WATCHLISTS
	};
}

export function loadWatchlistsSuccess(watchlists) {
	return {
		type: actions.LOAD_WATCHLISTS_SUCCESS,
		watchlists
	};
}

export function selectWatchlist(watchlist) {
	return {
		type: actions.SELECT_WATCHLIST,
		watchlistId: (watchlist && watchlist.id) || null
	};
}

export function createWatchlist(watchlist) {
	return {
		type: actions.CREATE_WATCHLIST,
		watchlist
	};
}

export function editWatchlist(watchlist) {
	return {
		type: actions.EDIT_WATCHLIST,
		watchlist
	};
}

export function saveWatchlistSuccess(watchlist) {
	return {
		type: actions.SAVE_WATCHLIST_SUCCESS,
		watchlist
	};
}

export function deleteWatchlist(watchlist) {
	return {
		type: actions.DELETE_WATCHLIST,
		watchlist
	};
}

export function deleteWatchlistSuccess(watchlist) {
	return {
		type: actions.DELETE_WATCHLIST_SUCCESS,
		watchlist
	};
}
