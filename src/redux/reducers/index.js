import { combineReducers } from "redux";
import watchlistsReducer from "./watchlistsReducer";
import watchlistOpReducer from './watchlistOpReducer';

const rootReducer = combineReducers({
  watchlists: watchlistsReducer,
  watchlistAsyncOp: watchlistOpReducer
});

export default rootReducer;