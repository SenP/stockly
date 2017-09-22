import { call, put, take, takeEvery, race, cancelled } from 'redux-saga/effects';
import { WatchlistService } from '../../services';
import { ADD_STOCK, EDIT_STOCK, DELETE_STOCK, DELETE_WATCHLIST } from '../actions/actionTypes';
import { saveStockSuccess, deleteStockSuccess } from '../actions/watchlistActions';
import { fetchQuotes } from '../actions/quotesActions';
import { startOp, endOpError, endOpSuccess, removeOp } from '../actions/opsActions';
import { STOCK } from '../actions/scopes';

function* saveStockMain(action) {
	const savedWL = action.watchlist;
	yield race({
		deleteWLTask: take(({ type, watchlist }) => type === DELETE_WATCHLIST && watchlist.id === savedWL.id),
		saveStockTask: call(saveStock, action)
	});
}

function* saveStock({ type, stock, watchlist }) {
	const op = type === ADD_STOCK ? 'ADD' : 'EDIT';
	yield put(startOp(STOCK, { stock, watchlist, op }));
	try {
		const { status, data: newStock } = yield call([WatchlistService, 'saveStock'], stock, watchlist);
		if (status === 'success') {
			yield put(saveStockSuccess(newStock, watchlist));
			yield put(fetchQuotes(newStock));
			yield put(endOpSuccess(STOCK, { stock: newStock, watchlist, op }));
		} else {
			throw status;
		}
	} catch (error) {
		yield put(endOpError(STOCK, { stock, watchlist, op, error }));
	} finally {
		if (yield cancelled()) {
			yield put(removeOp(STOCK, { stock, watchlist, op }));
		}
	}
}

function* deleteStockMain(action) {
	const deletedWL = action.watchlist;
	yield race({
		deleteWLTask: take(({ type, watchlist }) => type === DELETE_WATCHLIST && watchlist.id === deletedWL.id),
		deleteStockTask: call(deleteStock, action)
	});
}

function* deleteStock({ stock, watchlist }) {
	const op = 'DELETE';
	yield put(startOp(STOCK, { stock, watchlist, op }));
	try {
		const res = yield call([WatchlistService, 'deleteStock'], stock, watchlist);
		if (res.status === 'success') {
			yield put(deleteStockSuccess(stock, watchlist));
			yield put(endOpSuccess(STOCK, { stock, watchlist, op }));
		} else {
			throw res.status;
		}
	} catch (error) {
		yield put(endOpError(STOCK, { stock, watchlist, op, error }));
	} finally {
		if (yield cancelled()) {
			yield put(removeOp(STOCK, { stock, watchlist, op }));
		}
	}
}

export default [
	takeEvery(ADD_STOCK, saveStockMain),
	takeEvery(EDIT_STOCK, saveStockMain),
	takeEvery(DELETE_STOCK, deleteStockMain)
];
