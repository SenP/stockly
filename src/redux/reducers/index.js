import { combineReducers } from "redux";
import watchlistsReducer from "./watchlistsReducer";
//import watchlist from './watchlistReducer';

const rootReducer = combineReducers({
  watchlists: watchlistsReducer
});

export default rootReducer;