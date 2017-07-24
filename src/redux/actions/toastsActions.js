import * as actionTypes from "./actionTypes";
import { AddToast, RemoveToast } from "../../utils/Toaster";

export function addToast(stock, watchlist, op, msg, msgtype) {  
  let id = AddToast(msg, msgtype);
  return {
    type: actionTypes.ADD_TOAST,
    stock,
    watchlist,
    op,
    msgtype,
    id
  };
}

export function removeToast(id) {  
  RemoveToast(id);
  return {
    type: actionTypes.REMOVE_TOAST,
    id
  };
}
