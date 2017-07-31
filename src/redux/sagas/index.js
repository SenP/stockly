import { all } from "redux-saga/effects";
import watchlistsSagas from "./watchlistsSagas";
import watchlistSagas from "./watchlistSagas";
import quotesSagas from "./quotesSagas";
import toastSagas from "./toastSagas";

export default function* rootSaga() {
  yield all([
    ...watchlistsSagas,
    ...watchlistSagas,
    ...quotesSagas,
    ...toastSagas
  ]);
}
