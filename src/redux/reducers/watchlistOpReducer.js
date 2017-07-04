import * as types from "../actions/actionTypes.js";
import initialState from "../initialState";

export default function(state = initialState.watchlistAsyncOp, action) {
  switch (action.type) {
    case types.START_ASYNC_OP_WATCHLIST:
      return {
        watchlist: action.watchlist,
        op: action.op,
        status: "pending",
        error: null
      };

    case types.END_ASYNC_OP_WATCHLIST:
      return {
        watchlist: action.watchlist,
        op: action.op,
        status: "complete",
        error: action.error
      };

    case types.RESET_WATCHLIST_OP_STATUS:
      return initialState.watchlistAsyncOp;

    default:
      return state;
  }
}
