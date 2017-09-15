import * as actions from './actionTypes';
import getOpKey from '../../utils/getOpKey';

export function initOp(scope, payload) {
	return {
		type: actions.INIT_OP,
		key: getOpKey(scope, payload),
		payload: { scope, ...payload }
	};
}

export function startOp(scope, payload) {
	return {
		type: actions.START_OP,
		key: getOpKey(scope, payload),
		payload: { scope, ...payload }
	};
}

export function updateOp(scope, payload) {
	return {
		type: actions.UPDATE_OP,
		key: getOpKey(scope, payload),
		payload: { scope, ...payload }
	};
}

export function endOpSuccess(scope, payload) {
	return {
		type: actions.END_OP_SUCCESS,
		key: getOpKey(scope, payload),
		payload: { scope, ...payload }
	};
}

export function endOpError(scope, payload) {
	return {
		type: actions.END_OP_ERROR,
		key: getOpKey(scope, payload),
		payload: { scope, ...payload }
	};
}

export function removeOp(scope, payload) {
	return {
		type: actions.REMOVE_OP,
		key: getOpKey(scope, payload)
	};
}
