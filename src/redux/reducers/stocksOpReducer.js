/* eslint-disable default-case */
import * as types from '../actions/actionTypes.js';
import initialState from '../initialState';

export default function StocksOpReducer(stocksOp = initialState.stocksOpByKey, action) {
	if (!action.type.includes('STOCK_OP')) {
		return stocksOp;
	}
	let { stock, watchlist, op } = action;
	const opKey = stock ? `${watchlist.id}-${stock.code}-${op}` : `${watchlist.id}-${op}`;
	switch (action.type) {
		case types.INIT_STOCK_OP:
		case types.UPDATE_STOCK_OP:
			return {
				...stocksOp,
				[opKey]: {
					stock,
					watchlist,
					op,
					status: 'new',
					error: null
				}
			};

		case types.START_STOCK_OP:
			return {
				...stocksOp,
				[opKey]: {
					stock,
					watchlist,
					op,
					status: 'pending',
					error: null
				}
			};

		case types.END_STOCK_OP_ERROR:
			return {
				...stocksOp,
				[opKey]: {
					stock,
					watchlist,
					op,
					status: 'complete',
					error: action.error
				}
			};

		case types.END_STOCK_OP_SUCCESS:
		case types.REMOVE_STOCK_OP: {
			let { [opKey]: temp, ...newStocksOp } = stocksOp;
			return newStocksOp;
		}
	}
}
