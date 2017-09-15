import { call, put, take, takeEvery, race, cancelled } from 'redux-saga/effects';

import { WatchlistService } from '../../services';
import * as actionTypes from '../actions/actionTypes';
import * as watchlistActions from '../actions/watchlistActions';
import * as quotesActions from '../actions/quotesActions';
import * as opsActions from '../actions/opsActions';
import { STOCK } from '../actions/scopes';

function deleteCurrentWatchlist({ type, watchlist }, WL) {
	return type === actionTypes.DELETE_WATCHLIST && watchlist.id === WL.id;
}

function* saveStockMain(action) {
	let WL = action.watchlist;
	yield race({
		deleteWLTask: take(action => deleteCurrentWatchlist(action, WL)),
		saveStockTask: call(saveStock, action)
	});
}

function* saveStock({ type, stock, watchlist }) {
	let op = type === actionTypes.ADD_STOCK ? 'ADD' : 'EDIT';
	yield put(opsActions.startOp(STOCK, { stock, watchlist, op }));
	try {
		const { status, data: newStock } = yield call([WatchlistService, 'saveStock'], stock, watchlist);
		if (status === 'success') {
			yield put(watchlistActions.saveStockSuccess(newStock, watchlist));
			yield put(quotesActions.fetchQuotes(newStock));
			yield put(opsActions.endOpSuccess(STOCK, { stock: newStock, watchlist, op }));
		} else {
			throw status;
		}
	} catch (error) {
		yield put(opsActions.endOpError(STOCK, { stock, watchlist, op, error }));
	} finally {
		if (yield cancelled()) {
			yield put(opsActions.removeOp(STOCK, { stock, watchlist, op }));
		}
	}
}

function* deleteStockMain(action) {
	let WL = action.watchlist;
	yield race({
		deleteWLTask: take(action => deleteCurrentWatchlist(action, WL)),
		deleteStockTask: call(deleteStock, action)
	});
}

function* deleteStock({ stock, watchlist }) {
	let op = 'DELETE';
	yield put(opsActions.startOp(STOCK, { stock, watchlist, op }));
	try {
		const res = yield call([WatchlistService, 'deleteStock'], stock, watchlist);
		if (res.status === 'success') {
			yield put(watchlistActions.deleteStockSuccess(stock, watchlist));
			yield put(opsActions.endOpSuccess(STOCK, { stock, watchlist, op }));
		} else {
			throw res.status;
		}
	} catch (error) {
		yield put(opsActions.endOpError(STOCK, { stock, watchlist, op, error }));
	} finally {
		if (yield cancelled()) {
			yield put(opsActions.removeOp(STOCK, { stock, watchlist, op }));
		}
	}
}

export default [
	takeEvery(actionTypes.ADD_STOCK, saveStockMain),
	takeEvery(actionTypes.EDIT_STOCK, saveStockMain),
	takeEvery(actionTypes.DELETE_STOCK, deleteStockMain)
];
