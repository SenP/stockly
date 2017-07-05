import { call, put, takeEvery } from "redux-saga/effects";
import { WatchlistService, QuotesService } from "../../services";
import * as watchlistActions from "../actions/watchlistActions";
import * as quotesActions from "../actions/quotesActions";
import * as actionTypes from "../actions/actionTypes";

function* saveStock(action) {
  let { stock, watchlist } = action;
  yield put({ type: "START_ASYNC_OP_STOCK", op: "SAVE", stock, watchlist });
  try {
    const { status, data: newStock } = yield call(
      [WatchlistService, WatchlistService.saveStock],
      stock,
      watchlist
    );
    if (status === "success") {
      yield put(watchlistActions.saveStockSuccess(newStock, watchlist));
      yield call([QuotesService, QuotesService.register], newStock.code);
      yield put(quotesActions.fetchQuotes(newStock));
      yield put({
        type: "END_ASYNC_OP_STOCK",
        op: "SAVE",
        stock: newStock,
        watchlist,
        error: null
      });
    } else {
      throw status;
    }
  } catch (error) {
    yield put({
      type: "END_ASYNC_OP_STOCK",
      op: "SAVE",
      stock,
      watchlist,
      error
    });
  }
}

function* deleteStock(action) {
  let { stock, watchlist } = action;
  yield put({ type: "START_ASYNC_OP_STOCK", op: "DELETE", stock, watchlist });
  try {
    const { status } = yield call(
      [WatchlistService, WatchlistService.deleteStock],
      stock,
      watchlist
    );
    if (status === "success") {
      yield put(watchlistActions.deleteStockSuccess(stock, watchlist));
      yield call([QuotesService, QuotesService.deregister], stock.code);
      yield put({
        type: "END_ASYNC_OP_STOCK",
        op: "DELETE",
        stock,
        watchlist,
        error: null
      });
    } else {
      throw status;
    }
  } catch (error) {
    yield put({
      type: "END_ASYNC_OP_STOCK",
      op: "DELETE",
      stock,
      watchlist,
      error
    });
  }
}

export default [
  takeEvery(actionTypes.ADD_STOCK, saveStock),
  takeEvery(actionTypes.EDIT_STOCK, saveStock),
  takeEvery(actionTypes.DELETE_STOCK, deleteStock)
];
