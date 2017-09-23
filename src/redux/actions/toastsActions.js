import { ADD_TOAST, REMOVE_TOAST } from './actionTypes';

export const addToast = (key, msgtype, id) => ({ type: ADD_TOAST, key, msgtype, id });
export const removeToast = id => ({ type: REMOVE_TOAST, id });
