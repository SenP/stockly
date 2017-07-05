import * as types from "../actions/actionTypes.js";
import initialState from "../initialState";

export default function StocksOpReducer(
  state = initialState.stocksAsyncOp,
  action
) {
  let { stock, watchlist, op } = action;
  switch (action.type) {
    case types.START_ASYNC_OP_STOCK:
      return [
        ...state,
        {
          stock,
          watchlist,
          op,
          status: "pending",
          error: null
        }
      ];

    case types.END_ASYNC_OP_STOCK: {
      let idx = state.findIndex(
        stockOp =>
          stockOp.stock.code === stock.code &&
          stockOp.watchlist.id === watchlist.id &&
          stockOp.op === op
      );

      return [
        ...state.slice(0, idx),
        {
          stock,
          watchlist,
          op,
          status: "complete",
          error: action.error
        },
        ...state.slice(idx + 1)
      ];
    }

    case types.REMOVE_STOCK_OP_STATUS: {
      let idx = state.findIndex(
        stockOp =>
          stockOp.stock.code === stock.code &&
          stockOp.watchlist.id === watchlist.id
      );
      return [...state.slice(0, idx), ...state.slice(idx + 1)];
    }

    default:
      return state;
  }
}
