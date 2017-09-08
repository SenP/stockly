import * as types from '../actions/actionTypes.js';
import initialState from '../initialState';

export default function ToastsReducer(state = initialState.toastsByKey, action) {
	let { key, id, msgtype } = action;
	switch (action.type) {
		case types.ADD_TOAST:
			return msgtype === 'error'
				? {
						...state,
						[key]: { id }
					}
				: state;

		case types.REMOVE_TOAST: {
			let { [key]: temp, ...newState } = state;
			return newState;
		}

		default:
			return state;
	}
}
