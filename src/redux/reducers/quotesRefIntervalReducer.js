import { SET_QUOTES_INTERVAL } from '../actions/actionTypes.js';
import initialState from '../initialState';

function quotesRefIntervalReducer(quotesRefInterval = initialState.quotesRefInterval, { type, interval }) {
	switch (type) {
		case SET_QUOTES_INTERVAL:
			return interval;
		default:
			return quotesRefInterval;
	}
}

export default quotesRefIntervalReducer;
