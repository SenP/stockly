import * as types from '../actions/actionTypes.js';
import initialState from '../initialState';

export default function ToastsReducer(toasts = initialState.toastsByKey, action) {
	let { key, id, msgtype } = action;
	switch (action.type) {
		case types.ADD_TOAST:
			return msgtype === 'error'
				? {
						...toasts,
						[key]: { id }
					}
				: toasts;

		case types.REMOVE_TOAST: {
			let { [key]: temp, ...newToasts } = toasts;
			return newToasts;
		}

		default:
			return toasts;
	}
}
