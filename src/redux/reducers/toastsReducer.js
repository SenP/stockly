import * as types from "../actions/actionTypes.js";
import initialState from "../initialState";

export default function ToastsReducer(state = initialState.toasts, action) {
  let { key, id, msgtype } = action;
  switch (action.type) {
    case types.ADD_TOAST:
      return msgtype === "error"
        ? [
            ...state,
            {
              key,
              id
            }
          ]
        : state;

    case types.REMOVE_TOAST: {
      let idx = state.findIndex(toast => toast.id === id);
      return idx === -1
        ? state
        : [...state.slice(0, idx), ...state.slice(idx + 1)];
    }

    default:
      return state;
  }
}
