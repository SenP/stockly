import { call, put, takeEvery, select } from "redux-saga/effects";

import * as toastsActions from "../actions/toastsActions";
import * as actionTypes from "../actions/actionTypes";
import getToast from "../selectors/getToast";
import { AddToast, RemoveToast } from "../../utils/Toaster";

function* addToast(action) {
  let { type, stock, watchlist, op } = action;
  let key, opMsg, msgType;
  switch (type) {
    case actionTypes.END_ASYNC_OP_WATCHLIST_SUCCESS:
      key = `${watchlist.id}:${op}`;
      opMsg = `${op === "CREATE" || op === "EDIT"
        ? "Saved"
        : "Deleted"} watchlist '${watchlist.name}'`;
      msgType = "success";
      break;

    case actionTypes.END_ASYNC_OP_STOCK_SUCCESS:
      key = `${stock.code}:${watchlist.id}:${op}`;
      opMsg = `${op === "ADD" || op === "EDIT"
        ? "Saved"
        : "Deleted"} stock '${stock.code}' on watchlist '${watchlist.name}'`;
      msgType = "success";
      break;

    case actionTypes.END_ASYNC_OP_STOCK_ERROR:
      key = `${stock.code}:${watchlist.id}:${op}`;
      opMsg = `Failed to ${op.toLowerCase()} stock '${stock.code}' on watchlist '${watchlist.name}'`;
      msgType = "error";
      break;

    default:
      return;
  }

  let id = yield call(AddToast, opMsg, msgType);
  yield put(toastsActions.addToast(key, opMsg, msgType, id));
}

function* removeToast(action) {
  let { stock, watchlist, op } = action;
  let key = `${stock.code}:${watchlist.id}:${op}`;
  const toast = yield select(getToast, key);
  if (toast && toast.length > 0) {
    yield call(RemoveToast, toast[0].id);
    yield put(toastsActions.removeToast(toast[0].id));
  }
}

export default [
  takeEvery(actionTypes.END_ASYNC_OP_WATCHLIST_SUCCESS, addToast),
  takeEvery(actionTypes.END_ASYNC_OP_WATCHLIST_ERROR, addToast),
  takeEvery(actionTypes.END_ASYNC_OP_STOCK_SUCCESS, addToast),
  takeEvery(actionTypes.END_ASYNC_OP_STOCK_ERROR, addToast),
  takeEvery(actionTypes.START_ASYNC_OP_STOCK, removeToast),
  takeEvery(actionTypes.REMOVE_ASYNC_OP_STOCK, removeToast)
];
