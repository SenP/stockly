import { call, put, takeEvery } from "redux-saga/effects";
import { WatchlistService } from "../../services";
import * as watchlistsActions from "../actions/watchlistsActions";
import * as actionTypes from "../actions/actionTypes";

function* loadWatchlists() {
  try {
    const watchlists = yield call([
      WatchlistService,
      WatchlistService.getWatchlists
    ]);
    console.log(watchlists);
    yield put(watchlistsActions.loadWatchlistsSuccess(watchlists));
  } catch (error) {
    console.log(error);
  }
}

function* saveWatchlist(action) {
  yield put({ type: "START_ASYNC_OP_WATCHLIST", op: "SAVE", watchlist: action.watchlist });
  try {
    const watchlist = yield call(
      [WatchlistService, WatchlistService.saveWatchlist],
      action.watchlist
    );
    yield put(watchlistsActions.saveWatchlistSuccess(watchlist.data));
    yield put({
      type: "END_ASYNC_OP_WATCHLIST",
      op: "SAVE",
      watchlist: action.watchlist,
      error: null
    });
  } catch (error) {
    yield put({
      type: "END_ASYNC_OP_WATCHLIST",
      op: "SAVE",
      watchlist: action.watchlist,
      error
    });
  }
}

function* deleteWatchlist(action) {
  yield put({ type: "START_ASYNC_OP_WATCHLIST", op: "DELETE", watchlist: action.watchlist });
  try {
    const watchlist = yield call(
      [WatchlistService, WatchlistService.deleteWatchlist],
      action.watchlist
    );
    yield put(watchlistsActions.deleteWatchlistSuccess(watchlist.data));
    yield put({
      type: "END_ASYNC_OP_WATCHLIST",
      op: "DELETE",
      watchlist: action.watchlist,
      error: null
    });
  } catch (error) {
    yield put({
      type: "END_ASYNC_OP_WATCHLIST",
      op: "DELETE",
      watchlist: action.watchlist,
      error
    });
  }
}

export default [
    takeEvery(actionTypes.LOAD_WATCHLISTS, loadWatchlists),
    takeEvery(actionTypes.CREATE_WATCHLIST, saveWatchlist),
    takeEvery(actionTypes.EDIT_WATCHLIST, saveWatchlist),
    takeEvery(actionTypes.DELETE_WATCHLIST, deleteWatchlist)
  ];

