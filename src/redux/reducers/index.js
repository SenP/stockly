import { combineReducers } from 'redux';
import watchlistsReducer from './watchlistsReducer';
import selectedWatchlistReducer from './selectedWatchlistReducer';
import watchlistOpReducer from './watchlistOpReducer';
import stocksOpReducer from './stocksOpReducer';
import toastsReducer from './toastsReducer';
import quotesRefIntervalReducer from './quotesRefIntervalReducer';

const rootReducer = combineReducers({
	watchlists: watchlistsReducer,
	selectedWatchlist: selectedWatchlistReducer,
	watchlistAsyncOp: watchlistOpReducer,
	stocksAsyncOp: stocksOpReducer,
	toasts: toastsReducer,
	quotesRefInterval: quotesRefIntervalReducer
});

export default rootReducer;
