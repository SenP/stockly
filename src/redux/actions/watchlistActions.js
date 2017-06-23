import * as actionTypes from "./actionTypes";

export function addStock(stock, watchlist) {
  return {
    type: actionTypes.ADD_STOCK,
    watchlist,
    stock
  };
}

export function editStock(stock, watchlist) {
  return {
    type: actionTypes.EDIT_STOCK,
    watchlist,
    stock
  };
}

export function deleteStock(stock, watchlist) {
  return {
    type: actionTypes.DELETE_STOCK,
    watchlist,
    stock
  };
}
