import { SAVE_STOCK_SUCCESS, DELETE_STOCK_SUCCESS, FETCH_QUOTES_SUCCESS } from '../actions/actionTypes.js';
import stockReducer from './stockReducer';

function stocksReducer(stocks = [], action) {
	switch (action.type) {
		case SAVE_STOCK_SUCCESS: {
			const { code } = action.stock;
			const stock = stocks[code] || undefined;
			return Object.assign({}, stocks, { [code]: stockReducer(stock, action) });
		}

		case DELETE_STOCK_SUCCESS: {
			const { [action.stock.code]: temp, ...newStocks } = stocks;
			return newStocks;
		}
		
		case FETCH_QUOTES_SUCCESS: {
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

export default stocksReducer;
