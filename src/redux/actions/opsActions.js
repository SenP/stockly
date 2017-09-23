import * as actions from './actionTypes';
import getOpKey from '../../utils/getOpKey';

const getAction = (type, scope, payload) => ({
	type,
	key: getOpKey(scope, payload),
	payload: { scope, ...payload }
});

export const initOp = (scope, payload) => getAction(actions.INIT_OP, scope, payload);
export const startOp = (scope, payload) => getAction(actions.START_OP, scope, payload);
export const updateOp = (scope, payload) => getAction(actions.UPDATE_OP, scope, payload);
export const endOpSuccess = (scope, payload) => getAction(actions.END_OP_SUCCESS, scope, payload);
export const endOpError = (scope, payload) => getAction(actions.END_OP_ERROR, scope, payload);

export const removeOp = (scope, payload) => ({
	type: actions.REMOVE_OP,
	key: getOpKey(scope, payload)
});
