import { call, put, takeEvery, select } from 'redux-saga/effects';
import { WatchlistService } from '../../services';
import {
	loadWatchlistsSuccess,
	saveWatchlistSuccess,
	deleteWatchlistSuccess,
	selectWatchlist
} from '../actions/watchlistsActions';
import { fetchQuotes } from '../actions/quotesActions';
import { startOp, endOpError, endOpSuccess } from '../actions/opsActions';
import { LOAD_WATCHLISTS, CREATE_WATCHLIST, EDIT_WATCHLIST, DELETE_WATCHLIST } from '../actions/actionTypes';
import selectSelectedWatchlist from '../selectors/selectSelectedWatchlist';
import selectWatchlists from '../selectors/selectWatchlists';
import { WATCHLIST } from '../actions/scopes';

function* loadWatchlists() {
	try {
		const watchlists = yield call([WatchlistService, 'getWatchlists']);
		yield put(loadWatchlistsSuccess(watchlists));
		yield put(fetchQuotes());
	} catch (error) {
		console.log(error);
	}
}

function* saveWatchlist({ type, watchlist }) {
	let op = type === CREATE_WATCHLIST ? 'CREATE' : 'EDIT';
	yield put(startOp(WATCHLIST, { watchlist, op }));
	try {
		const { status, data: newWL } = yield call([WatchlistService, 'saveWatchlist'], watchlist);
		if (status === 'success') {
			yield put(saveWatchlistSuccess(newWL));
			yield put(endOpSuccess(WATCHLIST, { watchlist, op }));
		} else {
			throw status;
		}
	} catch (error) {
		yield put(endOpError(WATCHLIST, { watchlist, op, error }));
	}
}

function* deleteWatchlist({ watchlist }) {
	const op = 'DELETE';
	yield put(startOp(WATCHLIST, { watchlist, op }));
	try {
		const res = yield call([WatchlistService, 'deleteWatchlist'], watchlist);
		if (res.status === 'success') {
			const selected = yield select(selectSelectedWatchlist);
			yield put(deleteWatchlistSuccess(watchlist));
			yield put(endOpSuccess(WATCHLIST, { watchlist, op }));
			// reset selected watchlist to first watchlist, if user has not moved to dashboard view
			if (selected) {
				const watchlists = yield select(selectWatchlists);
				watchlists.length > 0 ? yield put(selectWatchlist(watchlists[0])) : yield put(selectWatchlist(null));
			}
		} else {
			throw res.status;
		}
	} catch (error) {
		yield put(endOpError(WATCHLIST, { watchlist, op, error }));
	}
}

export default [
	takeEvery(LOAD_WATCHLISTS, loadWatchlists),
	takeEvery(CREATE_WATCHLIST, saveWatchlist),
	takeEvery(EDIT_WATCHLIST, saveWatchlist),
	takeEvery(DELETE_WATCHLIST, deleteWatchlist)
];
