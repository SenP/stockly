import { combineReducers } from "redux";
import watchlistsReducer from "./watchlistsReducer";
import watchlistOpReducer from "./watchlistOpReducer";
import stocksOpReducer from "./stocksOpReducer";
import toastsReducer from "./toastsReducer";

const rootReducer = combineReducers({
  watchlists: watchlistsReducer,
  watchlistAsyncOp: watchlistOpReducer,
  stocksAsyncOp: stocksOpReducer,
  toasts: toastsReducer
});

export default rootReducer;
