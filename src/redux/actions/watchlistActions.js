import * as actionTypes from './actionTypes';

export function addStock(stock, watchlist) {
	return {
		type: actionTypes.ADD_STOCK,
		watchlist,
		stock
	};
}

export function editStock(stock, watchlist) {
	return {
		type: actionTypes.EDIT_STOCK,
		watchlist,
		stock
	};
}

export function saveStockSuccess(stock, watchlist) {
	return {
		type: actionTypes.SAVE_STOCK_SUCCESS,
		watchlist,
		stock
	};
}

export function deleteStock(stock, watchlist) {
	return {
		type: actionTypes.DELETE_STOCK,
		watchlist,
		stock
	};
}

export function deleteStockSuccess(stock, watchlist) {
	return {
		type: actionTypes.DELETE_STOCK_SUCCESS,
		watchlist,
		stock
	};
}

export function initAsyncOp(stock, watchlist, op) {
	return {
		type: actionTypes.INIT_STOCK_OP,
		watchlist,
		stock,
		op
	};
}

export function startAsyncOp(stock, watchlist, op) {
	return {
		type: actionTypes.START_STOCK_OP,
		watchlist,
		stock,
		op
	};
}

export function updateAsyncOp(watchlist, stock, op) {
	return {
		type: actionTypes.UPDATE_STOCK_OP,
		watchlist,
		stock,
		op
	};
}

export function endAsyncOpSuccess(stock, watchlist, op) {
	return {
		type: actionTypes.END_STOCK_OP_SUCCESS,
		stock,
		watchlist,
		op,
		error: null
	};
}

export function endAsyncOpError(stock, watchlist, op, error = null) {
	return {
		type: actionTypes.END_STOCK_OP_ERROR,
		stock,
		watchlist,
		op,
		error
	};
}

export function removeAsyncOp(stock, watchlist, op) {
	return {
		type: actionTypes.REMOVE_STOCK_OP,
		stock,
		watchlist,
		op
	};
}
