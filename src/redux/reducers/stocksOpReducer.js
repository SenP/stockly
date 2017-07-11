import * as types from "../actions/actionTypes.js";
import initialState from "../initialState";
import { toast } from "react-toastify";

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

    case types.END_ASYNC_OP_STOCK_ERROR: {
      let idx = state.findIndex(
        stockOp =>
          stockOp.stock.code === stock.code &&
          stockOp.watchlist.id === watchlist.id &&
          stockOp.op === op
      );
      toast.error(
        `Failed to save stock '${stock.code}' on watchlist '${watchlist.name}'`
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

    case types.END_ASYNC_OP_STOCK_SUCCESS: {
      let idx = state.findIndex(
        stockOp =>
          stockOp.stock.code === stock.code &&
          stockOp.watchlist.id === watchlist.id &&
          stockOp.op === op
      );
      toast.success(
        `Saved stock '${stock.code}' on watchlist '${watchlist.name}'`
      );
      return [...state.slice(0, idx), ...state.slice(idx + 1)];
    }

    case types.REMOVE_ASYNC_OP_STOCK: {
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
