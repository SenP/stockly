import * as actions from './actionTypes';

export function fetchQuotes(stock) {
	return {
		type: actions.FETCH_QUOTES,
		stock: (stock && stock.code.split(':')[0]) || null
	};
}

export function fetchQuotesSuccess(quotes) {
	return {
		type: actions.FETCH_QUOTES_SUCCESS,
		quotes
	};
}

export function setQuotesInterval(interval) {
	return {
		type: actions.SET_QUOTES_INTERVAL,
		interval
	};
}
