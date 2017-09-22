import { call, put, takeEvery, select } from 'redux-saga/effects';
import { QuotesService } from '../../services';
import { fetchQuotesSuccess } from '../actions/quotesActions';
import { FETCH_QUOTES } from '../actions/actionTypes';
import selectAllStockCodes from '../selectors/selectAllStockCodes';

function* fetchQuotes(action) {
	const state = yield select();
	const stockCodes = action.stock || selectAllStockCodes(state);
	try {
		const newQuotes = yield call([QuotesService, 'refreshQuotes'], stockCodes);
		if (newQuotes) {
			yield put(fetchQuotesSuccess(newQuotes));
		}
		console.log(newQuotes);
	} catch (error) {
		console.log(error);
	}
}

export default [takeEvery(FETCH_QUOTES, fetchQuotes)];
