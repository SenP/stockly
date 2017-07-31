import * as actions from "../actions/actionTypes.js";
import initialState from "../initialState";

export default function(state = initialState.watchlistAsyncOp, action) {
  switch (action.type) {
    case actions.INIT_ASYNC_OP_WATCHLIST:
      return {
        watchlist: action.watchlist,
        op: action.op,
        status: "new",
        error: null
      };

    case actions.START_ASYNC_OP_WATCHLIST:
      return {
        watchlist: action.watchlist,
        op: action.op,
        status: "pending",
        error: null
      };

    case actions.END_ASYNC_OP_WATCHLIST_ERROR:
      return {
        watchlist: action.watchlist,
        op: action.op,
        status: "complete",
        error: action.error
      };

    case actions.END_ASYNC_OP_WATCHLIST_SUCCESS:
    case actions.RESET_ASYNC_OP_WATCHLIST:
      return initialState.watchlistAsyncOp;

    default:
      return state;
  }
}
