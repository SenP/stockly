import { call, put, takeEvery, select } from 'redux-saga/effects';
import { WatchlistService } from '../../services';
import * as watchlistsActions from '../actions/watchlistsActions';
import * as quotesActions from '../../redux/actions/quotesActions';
import * as opsActions from '../actions/opsActions';
import * as actionTypes from '../actions/actionTypes';
import selectSelectedWatchlist from '../selectors/selectSelectedWatchlist';
import selectWatchlists from '../selectors/selectWatchlists';
import { WATCHLIST } from '../actions/scopes';

function* loadWatchlists() {
	try {
		const watchlists = yield call([WatchlistService, 'getWatchlists']);
		yield put(watchlistsActions.loadWatchlistsSuccess(watchlists));
		yield put(quotesActions.fetchQuotes());
	} catch (error) {
		console.log(error);
	}
}

function* saveWatchlist({ type, watchlist }) {
	let op = type === actionTypes.CREATE_WATCHLIST ? 'CREATE' : 'EDIT';
	yield put(opsActions.startOp(WATCHLIST, { watchlist, op }));
	try {
		const { status, data: newWL } = yield call([WatchlistService, 'saveWatchlist'], watchlist);
		if (status === 'success') {
			yield put(watchlistsActions.saveWatchlistSuccess(newWL));
			yield put(opsActions.endOpSuccess(WATCHLIST, { watchlist, op }));
		} else {
			throw status;
		}
	} catch (error) {
		yield put(opsActions.endOpError(WATCHLIST, { watchlist, op, error }));
	}
}

function* deleteWatchlist({ watchlist }) {
	let op = 'DELETE';
	yield put(opsActions.startOp(WATCHLIST, { watchlist, op }));
	try {
		const res = yield call([WatchlistService, 'deleteWatchlist'], watchlist);
		if (res.status === 'success') {
			yield put(watchlistsActions.deleteWatchlistSuccess(watchlist));
			yield put(opsActions.endOpSuccess(WATCHLIST, { watchlist, op }));
			// reset selected watchlist if not in dashboard view
			const selected = yield select(selectSelectedWatchlist);
			if (selected) {
				const watchlists = yield select(selectWatchlists);
				watchlists.length > 0
					? yield put(watchlistsActions.selectWatchlist(watchlists[0]))
					: yield put(watchlistsActions.selectWatchlist(null));
			}
		} else {
			throw res.status;
		}
	} catch (error) {
		yield put(opsActions.endOpError(WATCHLIST, { watchlist, op, error }));
	}
}

export default [
	takeEvery(actionTypes.LOAD_WATCHLISTS, loadWatchlists),
	takeEvery(actionTypes.CREATE_WATCHLIST, saveWatchlist),
	takeEvery(actionTypes.EDIT_WATCHLIST, saveWatchlist),
	takeEvery(actionTypes.DELETE_WATCHLIST, deleteWatchlist)
];
