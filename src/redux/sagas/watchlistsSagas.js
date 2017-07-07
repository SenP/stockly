import { call, put, takeEvery } from "redux-saga/effects";
import { WatchlistService, QuotesService } from "../../services";
import * as watchlistsActions from "../actions/watchlistsActions";
import * as actionTypes from "../actions/actionTypes";

function* loadWatchlists() {
  try {
    const watchlists = yield call([WatchlistService, "getWatchlists"]);
    yield put(watchlistsActions.loadWatchlistsSuccess(watchlists));
  } catch (error) {
    console.log(error);
  }
}

function* saveWatchlist({ watchlist }) {
  yield put({
    type: "START_ASYNC_OP_WATCHLIST",
    op: "SAVE",
    watchlist
  });
  try {
    const res = yield call([WatchlistService, "saveWatchlist"], watchlist);
    if (res.status === "success") {
      yield put(watchlistsActions.saveWatchlistSuccess(res.data));
      yield put({
        type: "END_ASYNC_OP_WATCHLIST",
        op: "SAVE",
        watchlist,
        error: null
      });
    } else {
      throw res.status;
    }
  } catch (error) {
    yield put({
      type: "END_ASYNC_OP_WATCHLIST",
      op: "SAVE",
      watchlist,
      error
    });
  }
}

function* deleteWatchlist({ watchlist }) {
  yield put({
    type: "START_ASYNC_OP_WATCHLIST",
    op: "DELETE",
    watchlist
  });
  try {
    const res = yield call([WatchlistService, "deleteWatchlist"], watchlist);
    if (res.status === "success") {
      yield put(watchlistsActions.deleteWatchlistSuccess(watchlist));
      watchlist.stocks.forEach(stock => QuotesService.deregister(stock.code));
      yield put({
        type: "END_ASYNC_OP_WATCHLIST",
        op: "DELETE",
        watchlist,
        error: null
      });
      // TODO: remove pending async op for stocks
    } else {
      throw res.status;
    }
  } catch (error) {
    yield put({
      type: "END_ASYNC_OP_WATCHLIST",
      op: "DELETE",
      watchlist,
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
