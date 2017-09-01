import { call, put, takeEvery } from 'redux-saga/effects';
import { WatchlistService, QuotesService } from '../../services';
import * as watchlistsActions from '../actions/watchlistsActions';
import * as quotesActions from '../../redux/actions/quotesActions';
import * as actionTypes from '../actions/actionTypes';

function* loadWatchlists() {
	try {
		const watchlists = yield call([WatchlistService, 'getWatchlists']);
		yield put(watchlistsActions.loadWatchlistsSuccess(watchlists));
		Object.values(watchlists).forEach(wl => {
			Object.values(wl.stocks).forEach(QuotesService.register.bind(QuotesService));
		});
		yield put(quotesActions.fetchQuotes());
	} catch (error) {
		console.log(error);
	}
}

function* saveWatchlist({ type, watchlist }) {
	let op = type === actionTypes.CREATE_WATCHLIST ? 'CREATE' : 'EDIT';
	yield put(watchlistsActions.startAsyncOp(watchlist, op));
	try {
		const { status, data: newWL } = yield call([WatchlistService, 'saveWatchlist'], watchlist);
		if (status === 'success') {
			yield put(watchlistsActions.saveWatchlistSuccess(newWL));
			yield put(watchlistsActions.endAsyncOpSuccess(watchlist, op));
		} else {
			throw status;
		}
	} catch (error) {
		yield put(watchlistsActions.endAsyncOpError(watchlist, op, error));
	}
}

function* deleteWatchlist({ watchlist }) {
	let op = 'DELETE';
	yield put(watchlistsActions.startAsyncOp(watchlist, op));
	try {
		const res = yield call([WatchlistService, 'deleteWatchlist'], watchlist);
		if (res.status === 'success') {
			yield put(watchlistsActions.deleteWatchlistSuccess(watchlist));
			Object.values(watchlist.stocks).forEach(QuotesService.deregister.bind(QuotesService));
			yield put(watchlistsActions.endAsyncOpSuccess(watchlist, op));
		} else {
			throw res.status;
		}
	} catch (error) {
		yield put(watchlistsActions.endAsyncOpError(watchlist, op, error));
	}
}

export default [
	takeEvery(actionTypes.LOAD_WATCHLISTS, loadWatchlists),
	takeEvery(actionTypes.CREATE_WATCHLIST, saveWatchlist),
	takeEvery(actionTypes.EDIT_WATCHLIST, saveWatchlist),
	takeEvery(actionTypes.DELETE_WATCHLIST, deleteWatchlist)
];
