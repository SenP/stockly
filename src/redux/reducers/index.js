import { combineReducers } from 'redux';
import watchlistsReducer from './watchlistsReducer';
import selectedWatchlistReducer from './selectedWatchlistReducer';
import opsReducer from './opsReducer';
import toastsReducer from './toastsReducer';
import quotesRefIntervalReducer from './quotesRefIntervalReducer';

const rootReducer = combineReducers({
	watchlistsById: watchlistsReducer,
	selectedWatchlistId: selectedWatchlistReducer,
	opsByKey: opsReducer,
	toastsByKey: toastsReducer,
	quotesRefInterval: quotesRefIntervalReducer
});

export default rootReducer;
