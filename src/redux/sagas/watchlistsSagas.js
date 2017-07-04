import { call, put } from "redux-saga/effects";
import { WatchlistService } from "../../services";
import * as watchlistsActions from "../actions/watchlistsActions";

export function* loadWatchlists() {
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

export function* saveWatchlist(action) {
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

export function* deleteWatchlist(action) {
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
