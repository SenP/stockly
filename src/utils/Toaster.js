import React from "react";
import { toast } from "react-toastify";

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
  if (msgtype === "success") {
    return toast.success(
      <div style={{ color: "green" }}>
        {msg}
      </div>,
      toastSuccessOptions
    );
  } else if (msgtype === "error") {
    return toast.error(
      <div style={{ color: "red" }}>
        {msg}
      </div>,
      toastErrorOptions
    );
  } else return null;
}

export function RemoveToast(id) {
  toast.dismiss(id);
}
