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

export function* createWatchlist(action) {
  try {
    const watchlist = yield call(
      [WatchlistService, WatchlistService.saveWatchlist],
      action.watchlist
    );
    console.log(watchlist);
    yield put(watchlistsActions.createWatchlistSuccess(watchlist.data));
  } catch (error) {
    console.log(error);
  }
}
