import { call, put, takeEvery, select } from 'redux-saga/effects';
import * as toastsActions from '../actions/toastsActions';
import { START_OP, REMOVE_OP, END_OP_SUCCESS, END_OP_ERROR } from '../actions/actionTypes';
import { WATCHLIST, STOCK } from '../actions/scopes';
import getToast from '../selectors/getToast';
import { AddToast, RemoveToast } from '../../utils/Toaster';

function* addToast({ type, key, payload }) {
	const { op, scope, stock, watchlist } = payload;
	const opMsgSuccess = ['CREATE', 'ADD', 'EDIT'].includes(op) ? 'Saved' : 'Deleted';
	const opMsgError = `Failed to ${op.toLowerCase()}`;
	let opMsg, msgType;

	switch (type + scope) {
		case END_OP_SUCCESS + WATCHLIST:
			opMsg = `${opMsgSuccess} watchlist '${watchlist.name}'`;
			msgType = 'success';
			break;

		case END_OP_SUCCESS + STOCK:
			opMsg = `${opMsgSuccess} stock '${stock.code}' on watchlist '${watchlist.name}'`;
			msgType = 'success';
			break;

		case END_OP_ERROR + STOCK:
			opMsg = `${opMsgError} stock '${stock.code}' on watchlist '${watchlist.name}'`;
			msgType = 'error';
			break;

		default:
			return;
	}

	const id = yield call(AddToast, opMsg, msgType);
	yield put(toastsActions.addToast(key, msgType, id));
}

function* removeToast({ key }) {
	const toast = yield select(getToast, key);
	if (toast) {
		yield call(RemoveToast, toast.id);
		yield put(toastsActions.removeToast(toast.id));
	}
}

export default [
	takeEvery(END_OP_SUCCESS, addToast),
	takeEvery(END_OP_ERROR, addToast),
	takeEvery(START_OP, removeToast),
	takeEvery(REMOVE_OP, removeToast)
];
