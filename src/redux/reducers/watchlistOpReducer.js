// /* eslint-disable default-case */
// import * as actions from '../actions/actionTypes.js';
// import initialState from '../initialState';

// export default function WatchlistOpReducer(watchlistOp = initialState.watchlistOpById, action) {
// 	if (!action.type.includes('WATCHLIST_OP')) {
// 		return watchlistOp;
// 	}
// 	let { watchlist, op } = action;
// 	switch (action.type) {
// 		case actions.INIT_WATCHLIST_OP:
// 			return {
// 				...watchlistOp,
// 				[watchlist.id]: {
// 					watchlist,
// 					op,
// 					status: 'new',
// 					error: null
// 				}
// 			};

// 		case actions.START_WATCHLIST_OP:
// 			return {
// 				watchlist: action.watchlist,
// 				op: action.op,
// 				status: 'pending',
// 				error: null
// 			};

// 		case actions.END_WATCHLIST_OP_ERROR:
// 			return {
// 				watchlist: action.watchlist,
// 				op: action.op,
// 				status: 'complete',
// 				error: action.error
// 			};

// 		case actions.END_WATCHLIST_OP_SUCCESS:
// 		case actions.RESET_WATCHLIST_OP:
// 			return initialState.watchlistOp;
// 	}
// }
