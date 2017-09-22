import * as actions from './actionTypes';

export const addStock = (stock, watchlist) => ({ type: actions.ADD_STOCK, stock, watchlist });
export const editStock = (stock, watchlist) => ({ type: actions.EDIT_STOCK, stock, watchlist });
export const saveStockSuccess = (stock, watchlist) => ({ type: actions.SAVE_STOCK_SUCCESS, stock, watchlist });
export const deleteStock = (stock, watchlist) => ({ type: actions.DELETE_STOCK, stock, watchlist });
export const deleteStockSuccess = (stock, watchlist) => ({ type: actions.DELETE_STOCK_SUCCESS, stock, watchlist });
