import { ADD_TOAST, REMOVE_TOAST } from '../actions/actionTypes.js';
import initialState from '../initialState';

function ToastsReducer(toasts = initialState.toastsByKey, { type, key, id, msgtype }) {
	switch (type) {
		case ADD_TOAST:
			return msgtype === 'error' ? { ...toasts, [key]: { id } } : toasts;

		case REMOVE_TOAST: {
			const { [key]: temp, ...newToasts } = toasts;
			return newToasts;
		}

		default:
			return toasts;
	}
}

export default ToastsReducer;
