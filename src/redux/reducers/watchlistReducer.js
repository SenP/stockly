import * as types from "../actions/actionTypes.js";
import { Watchlist as WatchlistModel } from "../../services";
import stocksReducer from "./stocksReducer";

export default function watchlistReducer(state = { stocks: [] }, action) {
  switch (action.type) {
    case types.SAVE_WATCHLIST_SUCCESS:
      return Object.assign(new WatchlistModel(), action.watchlist, {
        stocks: state.stocks
      });

    case types.FETCH_QUOTES_SUCCESS:
    case types.SAVE_STOCK_SUCCESS:
    case types.DELETE_STOCK_SUCCESS:
      return Object.assign(new WatchlistModel(), state, {
        stocks: stocksReducer(state.stocks, action)
      });

    default:
      return state;
  }
}
