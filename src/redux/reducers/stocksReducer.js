import * as types from "../actions/actionTypes.js";
import stockReducer from "./stockReducer";
import { WatchlistService } from "../../services";

export default function stocksReducer(state = [], action) {
  switch (action.type) {
    case types.ADD_STOCK:
      return [...state, stockReducer(undefined, action)];

    case types.EDIT_STOCK:
      return editStock(state, action);

    case types.DELETE_STOCK:
      return deleteStock(state, action);

    case types.FETCH_QUOTES_SUCCESS:
      return state.map(stock => stockReducer(stock, action));

    default:
      return state;
  }
}

function editStock(state, action) {
  let i = state.findIndex(stock => stock.code === action.stock.code);
  if (i !== -1) {
    return [
      ...state.slice(0, i),
      stockReducer(...state.slice(i, i + 1), action),
      ...state.slice(i + 1)
    ];
  } else {
    return state;
  }
}

function deleteStock(state, action) {
  WatchlistService.doRemoveStock(action.stock, action.watchlist);
  let i = state.findIndex(stock => stock.code === action.stock.code);
  if (i !== -1) {
    return [...state.slice(0, i), ...state.slice(i + 1)];
  } else {
    return state;
  }
}
