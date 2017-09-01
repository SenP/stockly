import * as types from '../actions/actionTypes.js';
import stockReducer from './stockReducer';

export default function stocksReducer(state = [], action) {
	switch (action.type) {
		case types.SAVE_STOCK_SUCCESS:
			return saveStock(state, action);

		case types.DELETE_STOCK_SUCCESS:
			return deleteStock(state, action);

		case types.FETCH_QUOTES_SUCCESS: {
			let newState = {};
			for (const code in state) {
				newState[code] = stockReducer(state[code], action);
			}
			return newState;
		}

		default:
			return state;
	}
}

function saveStock(state, action) {
	let stock = state[action.stock.code] || undefined;
	return Object.assign({}, state, { [action.stock.code]: stockReducer(stock, action) });
}

function deleteStock(state, action) {
	let tempState = { ...state };
	delete tempState[action.stock.code];
	return { ...tempState };
}
