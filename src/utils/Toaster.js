import React from 'react';
import { toast } from 'react-toastify';

const toastSuccessOptions = {
	autoClose: 3000,
	hideProgressBar: true,
	position: toast.POSITION.TOP_RIGHT
};

const toastErrorOptions = {
	autoClose: false,
	hideProgressBar: true,
	position: toast.POSITION.TOP_RIGHT
};

export function AddToast(msg, msgtype) {
	return msgtype === 'success'
		? toast.success(<div>{msg}</div>, toastSuccessOptions)
		: toast.error(<div>{msg}</div>, toastErrorOptions);
}

export function RemoveToast(id) {
	toast.dismiss(id);
}
