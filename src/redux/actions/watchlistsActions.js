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

export function initAsyncOp(watchlist, op) {
	return {
		type: actions.INIT_ASYNC_OP_WATCHLIST,
		watchlist,
		op
	};
}

export function startAsyncOp(watchlist, op) {
	return {
		type: actions.START_ASYNC_OP_WATCHLIST,
		watchlist,
		op
	};
}

export function updateAsyncOp(watchlist, op) {
	return {
		type: actions.UPDATE_ASYNC_OP_WATCHLIST,
		watchlist,
		op
	};
}

export function endAsyncOpSuccess(watchlist, op) {
	return {
		type: actions.END_ASYNC_OP_WATCHLIST_SUCCESS,
		watchlist,
		op,
		error: null
	};
}

export function endAsyncOpError(watchlist, op, error = null) {
	return {
		type: actions.END_ASYNC_OP_WATCHLIST_ERROR,
		watchlist,
		op,
		error
	};
}

export function resetAsyncOp() {
	return {
		type: actions.RESET_ASYNC_OP_WATCHLIST
	};
}
