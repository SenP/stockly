import { call, put, takeEvery, select } from 'redux-saga/effects';
import { QuotesService } from '../../services';
import * as quotesActions from '../actions/quotesActions';
import * as actionTypes from '../actions/actionTypes';
import selectAllStockCodes from '../selectors/selectAllStockCodes';

function* fetchQuotes(action) {
	const state = yield select();
	const stockCodes = action.stock || selectAllStockCodes(state);
	try {
		const newQuotes = yield call([QuotesService, QuotesService.refreshQuotes], stockCodes);
		if (newQuotes) {
			yield put(quotesActions.fetchQuotesSuccess(newQuotes));
		}
		console.log(newQuotes);
	} catch (error) {
		console.log(error);
	}
}

export default [takeEvery(actionTypes.FETCH_QUOTES, fetchQuotes)];
