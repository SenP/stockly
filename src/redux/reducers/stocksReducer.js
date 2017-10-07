import { SAVE_STOCK_SUCCESS, DELETE_STOCK_SUCCESS, FETCH_QUOTES_SUCCESS } from '../actions/actionTypes.js';
import stockReducer from './stockReducer';

function stocksReducer(stocksByCode = {}, action) {
	switch (action.type) {
		case SAVE_STOCK_SUCCESS: {
			const { code } = action.stock;
			const stock = stocksByCode[code] || undefined;
			return Object.assign({}, stocksByCode, { [code]: stockReducer(stock, action) });
		}

		case DELETE_STOCK_SUCCESS: {
			const { [action.stock.code]: temp, ...newStocks } = stocksByCode;
			return newStocks;
		}
		
		case FETCH_QUOTES_SUCCESS: {
			let newStocks = {};
			for (const code in stocksByCode) {
				newStocks[code] = stockReducer(stocksByCode[code], action);
			}
			return newStocks;
		}

		default:
			return stocksByCode;
	}
}

export default stocksReducer;
