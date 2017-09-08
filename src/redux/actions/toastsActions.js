import * as actionTypes from './actionTypes';

export function addToast(key, msgtype, id) {
	return {
		type: actionTypes.ADD_TOAST,
		key,
		msgtype,
		id
	};
}

export function removeToast(id) {
	return {
		type: actionTypes.REMOVE_TOAST,
		id
	};
}
