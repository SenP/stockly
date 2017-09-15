import { call, put, takeEvery, select } from 'redux-saga/effects';

import * as toastsActions from '../actions/toastsActions';
import * as actionTypes from '../actions/actionTypes';
import * as scopes from '../actions/scopes';
import getToast from '../selectors/getToast';
import { AddToast, RemoveToast } from '../../utils/Toaster';

function* addToast(action) {
	let { type, key, payload } = action;
	let { op } = payload;
	let opMsg, msgType;

	switch (type + payload.scope) {
		case actionTypes.END_OP_SUCCESS + scopes.WATCHLIST:
			opMsg = `${op === 'CREATE' || op === 'EDIT' ? 'Saved' : 'Deleted'} watchlist '${payload.watchlist.name}'`;
			msgType = 'success';
			break;

		case actionTypes.END_OP_SUCCESS + scopes.STOCK:
			opMsg = `${op === 'ADD' || op === 'EDIT' ? 'Saved' : 'Deleted'} stock '${payload.stock
				.code}' on watchlist '${payload.watchlist.name}'`;
			msgType = 'success';
			break;

		case actionTypes.END_OP_ERROR + scopes.STOCK:
			opMsg = `Failed to ${op.toLowerCase()} stock '${payload.stock.code}' on watchlist '${payload.watchlist
				.name}'`;
			msgType = 'error';
			break;

		default:
			return;
	}

	let id = yield call(AddToast, opMsg, msgType);
	yield put(toastsActions.addToast(key, msgType, id));
}

function* removeToast(action) {
	const toast = yield select(getToast, action.key);
	if (toast) {
		yield call(RemoveToast, toast.id);
		yield put(toastsActions.removeToast(toast.id));
	}
}

export default [
	takeEvery(actionTypes.END_OP_SUCCESS, addToast),
	takeEvery(actionTypes.END_OP_ERROR, addToast),
	takeEvery(actionTypes.START_OP, removeToast),
	takeEvery(actionTypes.REMOVE_OP, removeToast)
];
