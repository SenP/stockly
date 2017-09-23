import * as types from '../actions/actionTypes.js';
import initialState from '../initialState';

function opsReducer(ops = initialState.opsByKey, { type, key, payload }) {
	switch (type) {
		case types.INIT_OP:
		case types.UPDATE_OP:
			return { ...ops, [key]: { ...payload, status: 'new', error: null } };

		case types.START_OP:
			return { ...ops, [key]: { ...payload, status: 'pending', error: null } };

		case types.END_OP_ERROR:
			return { ...ops, [key]: { ...payload, status: 'complete', error: payload.error } };

		case types.END_OP_SUCCESS:
		case types.REMOVE_OP: {
			//eslint-disable-next-line no-unused-vars
			const { [key]: deletedOp, ...remainingOps } = ops;
			return remainingOps;
		}
		default:
			return ops;
	}
}

export default opsReducer;
