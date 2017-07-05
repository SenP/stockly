import { combineReducers } from "redux";
import watchlistsReducer from "./watchlistsReducer";
import watchlistOpReducer from './watchlistOpReducer';
import stocksOpReducer from './stocksOpReducer';

const rootReducer = combineReducers({
  watchlists: watchlistsReducer,
  watchlistAsyncOp: watchlistOpReducer,
  stocksAsyncOp: stocksOpReducer
});

export default rootReducer;