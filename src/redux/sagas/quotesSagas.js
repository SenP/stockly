import { call, put, takeEvery } from "redux-saga/effects";
import { QuotesService } from "../../services";
import * as quotesActions from "../actions/quotesActions";
import * as actionTypes from "../actions/actionTypes";

function* fetchQuotes(action) {
  try {
    const newQuotes = yield call(
      [QuotesService, QuotesService.refreshQuotes],
      action.stock
    );
    if (newQuotes) {
      yield put(quotesActions.fetchQuotesSuccess(newQuotes));
    }
    console.log(newQuotes);
  } catch (error) {
    console.log(error);
  }
}

export default [takeEvery(actionTypes.FETCH_QUOTES, fetchQuotes)];
