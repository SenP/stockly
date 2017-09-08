import { call, put, takeEvery, select } from 'redux-saga/effects';

import * as toastsActions from '../actions/toastsActions';
import * as actionTypes from '../actions/actionTypes';
import getToast from '../selectors/getToast';
import { AddToast, RemoveToast } from '../../utils/Toaster';

function* addToast(action) {
	let { type, stock, watchlist, op } = action;
	let key, opMsg, msgType;
	switch (type) {
		case actionTypes.END_WATCHLIST_OP_SUCCESS:
			key = `${watchlist.id}:${op}`;
			opMsg = `${op === 'CREATE' || op === 'EDIT' ? 'Saved' : 'Deleted'} watchlist '${watchlist.name}'`;
			msgType = 'success';
			break;

		case actionTypes.END_STOCK_OP_SUCCESS:
			key = `${stock.code}:${watchlist.id}:${op}`;
			opMsg = `${op === 'ADD' || op === 'EDIT'
				? 'Saved'
				: 'Deleted'} stock '${stock.code}' on watchlist '${watchlist.name}'`;
			msgType = 'success';
			break;

		case actionTypes.END_STOCK_OP_ERROR:
			key = `${stock.code}:${watchlist.id}:${op}`;
			opMsg = `Failed to ${op.toLowerCase()} stock '${stock.code}' on watchlist '${watchlist.name}'`;
			msgType = 'error';
			break;

		default:
			return;
	}

	let id = yield call(AddToast, opMsg, msgType);
	yield put(toastsActions.addToast(key, msgType, id));
}

function* removeToast(action) {
	let { stock, watchlist, op } = action;
	let key = `${stock.code}:${watchlist.id}:${op}`;
	const toast = yield select(getToast, key);
	if (toast) {
		yield call(RemoveToast, toast.id);
		yield put(toastsActions.removeToast(toast.id));
	}
}

export default [
	takeEvery(actionTypes.END_WATCHLIST_OP_SUCCESS, addToast),
	takeEvery(actionTypes.END_WATCHLIST_OP_ERROR, addToast),
	takeEvery(actionTypes.END_STOCK_OP_SUCCESS, addToast),
	takeEvery(actionTypes.END_STOCK_OP_ERROR, addToast),
	takeEvery(actionTypes.START_STOCK_OP, removeToast),
	takeEvery(actionTypes.REMOVE_STOCK_OP, removeToast)
];
