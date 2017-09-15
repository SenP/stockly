/* eslint-disable default-case */
import * as types from '../actions/actionTypes.js';
import initialState from '../initialState';

export default function opsReducer(ops = initialState.opsByKey, action) {
	if (!action.type.includes('_OP')) {
		return ops;
	}

	let { type, key, payload } = action;
	// const opKey = stock ? `${watchlist.id}-${stock.code}-${op}` : `${watchlist.id}-${op}`;
	switch (type) {
		case types.INIT_OP:
		case types.UPDATE_OP:
			return {
				...ops,
				[key]: {
					...payload,
					status: 'new',
					error: null
				}
			};

		case types.START_OP:
			return {
				...ops,
				[key]: {
					...payload,
					status: 'pending',
					error: null
				}
			};

		case types.END_OP_ERROR:
			return {
				...ops,
				[key]: {
					...payload,
					status: 'complete',
					error: payload.error
				}
			};

		case types.END_OP_SUCCESS:
		case types.REMOVE_OP: {
			//eslint-disable-next-line no-unused-vars
			let { [key]: deletedOp, ...remainingOps } = ops;
			return remainingOps;
		}
	}
}
