import * as types from '../actions/actionTypes.js';
import stockReducer from './stockReducer';

export default function stocksReducer(stocks = [], action) {
	switch (action.type) {
		case types.SAVE_STOCK_SUCCESS:
			return saveStock(stocks, action);

		case types.DELETE_STOCK_SUCCESS:
			return deleteStock(stocks, action);

		case types.FETCH_QUOTES_SUCCESS: {
			let newStocks = {};
			for (const code in stocks) {
				newStocks[code] = stockReducer(stocks[code], action);
			}
			return newStocks;
		}

		default:
			return stocks;
	}
}

function saveStock(stocks, action) {
	let stock = stocks[action.stock.code] || undefined;
	return Object.assign({}, stocks, { [action.stock.code]: stockReducer(stock, action) });
}

function deleteStock(stocks, action) {
	let { [action.stock.code]: temp, ...newStocks } = stocks;
	return newStocks;
}
