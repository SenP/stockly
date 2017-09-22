import { SAVE_STOCK_SUCCESS, FETCH_QUOTES_SUCCESS } from '../actions/actionTypes.js';
import { Stock } from '../../services';

function stockReducer(stock = {}, action) {
	switch (action.type) {
		case SAVE_STOCK_SUCCESS:
			return Object.assign(new Stock(), action.stock);

		case FETCH_QUOTES_SUCCESS:
			return updateQuotes(stock, action);

		default:
			return stock;
	}
}

function updateQuotes(stock, action) {
	let quote = action.quotes.get(stock.code.split(':')[0]);
	return quote
		? Object.assign(new Stock(), stock, {
				lastPrice: quote.lastPrice || 0,
				change: quote.change || 0,
				percentChange: quote.percentChange || 0
			})
		: stock;
}

export default stockReducer;
