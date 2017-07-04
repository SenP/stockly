import { takeEvery, all } from "redux-saga/effects";
import * as actions from "../actions/actionTypes";
import * as watchlistsSagas from "./watchlistsSagas";

export default function* rootSaga() {
  yield all([
    takeEvery(actions.LOAD_WATCHLISTS, watchlistsSagas.loadWatchlists),
    takeEvery(actions.CREATE_WATCHLIST, watchlistsSagas.saveWatchlist),
    takeEvery(actions.EDIT_WATCHLIST, watchlistsSagas.saveWatchlist),
    takeEvery(actions.DELETE_WATCHLIST, watchlistsSagas.deleteWatchlist)
  ]);
}
