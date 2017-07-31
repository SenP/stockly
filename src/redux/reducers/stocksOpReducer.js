import * as types from "../actions/actionTypes.js";
import initialState from "../initialState";
import getStockOpIndex from "../selectors/getStockOpIndex";
import getStockOp from "../selectors/getStockOp";
import { Stock } from "../../services";

export default function StocksOpReducer(
  state = initialState.stocksAsyncOp,
  action
) {
  let { stock, watchlist, op } = action;
  switch (action.type) {
    case types.INIT_ASYNC_OP_STOCK:
      return [
        ...state,
        {
          stock,
          watchlist,
          op,
          status: "new",
          error: null
        }
      ];

    case types.START_ASYNC_OP_STOCK: {
      let idx = getStockOpIndex(state, stock, watchlist, op);
      return idx === -1
        ? state
        : [
            ...state.slice(0, idx),
            {
              stock,
              watchlist,
              op,
              status: "pending",
              error: null
            },
            ...state.slice(idx + 1)
          ];
    }

    case types.UPDATE_ASYNC_OP_STOCK: {
      // TODO: modify for EDIT op
      let stockOp = getStockOp(state, stock, watchlist, op);
      let idx = state.findIndex(
        stockOp => stockOp.watchlist.id === watchlist.id && stockOp.op === op
      );
      return !stockOp
        ? state
        : [
            ...state.slice(0, idx),
            Object.assign({}, stockOp, {
              stock: Object.assign(new Stock(), stock)
            }),
            ...state.slice(idx + 1)
          ];
    }

    case types.END_ASYNC_OP_STOCK_ERROR: {
      let idx = getStockOpIndex(state, stock, watchlist, op);
      return idx === -1
        ? state
        : [
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
      let idx = getStockOpIndex(state, stock, watchlist, op);
      return idx === -1
        ? state
        : [...state.slice(0, idx), ...state.slice(idx + 1)];
    }

    case types.REMOVE_ASYNC_OP_STOCK: {
      let idx = getStockOpIndex(state, stock, watchlist, op);
      return idx === -1
        ? state
        : [...state.slice(0, idx), ...state.slice(idx + 1)];
    }

    default:
      return state;
  }
}
