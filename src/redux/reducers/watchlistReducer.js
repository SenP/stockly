import * as types from "../actions/actionTypes.js";
import { Watchlist as WatchlistModel, WatchlistService } from "../../services";
import stocksReducer from "./stocksReducer";

export default function watchlistReducer(state = {}, action) {
  switch (action.type) {
    case types.CREATE_WATCHLIST:
    case types.EDIT_WATCHLIST:
      return WatchlistService.doSaveWatchlist(action.watchlist).data;

    case types.FETCH_QUOTES_SUCCESS:
      return Object.assign(new WatchlistModel(), state, {
        stocks: stocksReducer(state.stocks, action)
      });

    case types.ADD_STOCK:
    case types.EDIT_STOCK:
    case types.DELETE_STOCK:
      return Object.assign(new WatchlistModel(), state, {
        stocks: stocksReducer(state.stocks, action)
      });

    default:
      return state;
  }
}
