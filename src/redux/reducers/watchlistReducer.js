import * as types from "../actions/actionTypes.js";
import { Watchlist as WatchlistModel, WatchlistService } from "../../services";
import stocksReducer from "./stocksReducer";

export default function watchlistReducer(state = {}, action) {
  switch (action.type) {
    case types.CREATE_WATCHLIST_SUCCESS:
    case types.EDIT_WATCHLIST_SUCCESS:
      return action.watchlist;

    case types.FETCH_QUOTES_SUCCESS:    
    case types.ADD_STOCK_SUCCESS:
    case types.EDIT_STOCK_SUCCESS:
    case types.DELETE_STOCK_SUCCESS:
      return Object.assign(new WatchlistModel(), state, {
        stocks: stocksReducer(state.stocks, action)
      });

    default:
      return state;
  }
}
