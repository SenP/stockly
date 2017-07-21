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

export function saveStockSuccess(stock, watchlist) {
  return {
    type: actionTypes.SAVE_STOCK_SUCCESS,
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

export function deleteStockSuccess(stock, watchlist) {
  return {
    type: actionTypes.DELETE_STOCK_SUCCESS,
    watchlist,
    stock
  };
}

export function initStockOp(stock, watchlist, op) {
  return {
    type: actionTypes.INIT_ASYNC_OP_STOCK,
    watchlist,
    stock,
    op
  };
}

export function startStockOp(stock, watchlist, op) {
  return {
    type: actionTypes.START_ASYNC_OP_STOCK,
    watchlist,
    stock,
    op
  };
}

export function endStockOpSuccess(stock, watchlist, op) {    
  return {
    type: actionTypes.END_ASYNC_OP_STOCK_SUCCESS,
    stock,
    watchlist,
    op,
    error: null
  };
}

export function endStockOpError(stock, watchlist, op, error = null) {  
  return {
    type: actionTypes.END_ASYNC_OP_STOCK_ERROR,
    stock,
    watchlist,
    op,
    error
  };
}

export function removeStockOp(stock, watchlist, op) {
  return {
    type: actionTypes.REMOVE_ASYNC_OP_STOCK,
    stock,
    watchlist,
    op
  };
}

