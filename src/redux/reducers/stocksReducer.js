import * as types from "../actions/actionTypes.js";
import stockReducer from "./stockReducer";

export default function stocksReducer(state = [], action) {
  switch (action.type) {
    case types.SAVE_STOCK_SUCCESS:
      return saveStock(state, action);

    case types.DELETE_STOCK_SUCCESS:
      return deleteStock(state, action);

    case types.FETCH_QUOTES_SUCCESS:
      return state.map(stock => stockReducer(stock, action));

    default:
      return state;
  }
}

function saveStock(state, action) {
  let i = state.findIndex(stock => stock.code === action.stock.code);
  if (i !== -1) {
    // EDIT
    return [
      ...state.slice(0, i),
      stockReducer(...state.slice(i, i + 1), action),
      ...state.slice(i + 1)
    ];
  } else {
    // CREATE
    return [...state, stockReducer(undefined, action)];
  }
}

function deleteStock(state, action) {
  let i = state.findIndex(stock => stock.code === action.stock.code);
  return i === -1 ? state : [...state.slice(0, i), ...state.slice(i + 1)];
}
