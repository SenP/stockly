import { call, put, takeEvery, select } from "redux-saga/effects";

import { WatchlistService, QuotesService } from "../../services";
import * as actionTypes from "../actions/actionTypes";
import * as watchlistActions from "../actions/watchlistActions";
import * as quotesActions from "../actions/quotesActions";
import * as toastsActions from "../actions/toastsActions";
import getToast from "../selectors/getToast";

function* removeToast({ stock, watchlist, op }) {
  const toast = yield select(getToast, stock, watchlist, op);
  if (toast && toast.length > 0) {
    yield put(toastsActions.removeToast(toast[0].id));
  }
}

function* saveStock({ stock, watchlist }) {
  yield call(removeToast, { stock, watchlist, op: "EDIT" });
  yield put(watchlistActions.startStockOp(stock, watchlist, "EDIT"));
  try {
    const { status, data: newStock } = yield call(
      [WatchlistService, "saveStock"],
      stock,
      watchlist
    );
    if (status === "success") {
      yield put(watchlistActions.saveStockSuccess(newStock, watchlist));
      yield call([QuotesService, "register"], newStock.code);
      yield put(quotesActions.fetchQuotes(newStock));
      yield put(
        watchlistActions.endStockOpSuccess(newStock, watchlist, "EDIT")
      );
      yield put(
        toastsActions.addToast(
          stock,
          watchlist,
          "EDIT",
          `Saved stock '${stock.code}' on watchlist '${watchlist.name}'`,
          "success"
        )
      );
    } else {
      throw status;
    }
  } catch (error) {
    yield put(
      watchlistActions.endStockOpError(stock, watchlist, "EDIT", error)
    );
    yield put(
      toastsActions.addToast(
        stock,
        watchlist,
        "EDIT",
        `Failed to save stock '${stock.code}' on watchlist '${watchlist.name}'`,
        "error"
      )
    );
  }
}

function* deleteStock({ stock, watchlist }) {
  yield call(removeToast, { stock, watchlist, op: "DELETE" });
  yield put(watchlistActions.startStockOp(stock, watchlist, "DELETE"));
  try {
    const res = yield call([WatchlistService, "deleteStock"], stock, watchlist);
    if (res.status === "success") {
      yield put(watchlistActions.deleteStockSuccess(stock, watchlist));
      yield call([QuotesService, "deregister"], stock.code);
      yield put(watchlistActions.endStockOpSuccess(stock, watchlist, "DELETE"));
      yield put(
        toastsActions.addToast(
          stock,
          watchlist,
          "DELETE",
          `Deleted stock '${stock.code}' on watchlist '${watchlist.name}'`,
          "success"
        )
      );
    } else {
      throw res.status;
    }
  } catch (error) {
    yield put(
      watchlistActions.endStockOpError(stock, watchlist, "DELETE", error)
    );
    yield put(
      toastsActions.addToast(
        stock,
        watchlist,
        "DELETE",
        `Failed to delete stock '${stock.code}' on watchlist '${watchlist.name}'`,
        "error"
      )
    );
  }
}

export default [
  takeEvery(actionTypes.ADD_STOCK, saveStock),
  takeEvery(actionTypes.EDIT_STOCK, saveStock),
  takeEvery(actionTypes.DELETE_STOCK, deleteStock),
  takeEvery(actionTypes.REMOVE_ASYNC_OP_STOCK, removeToast)
];
