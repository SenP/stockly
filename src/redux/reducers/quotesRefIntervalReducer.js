import * as actions from '../actions/actionTypes.js';
import initialState from '../initialState';

export default function(state = initialState.quotesRefInterval, action) {
	switch (action.type) {
		case actions.SET_QUOTES_INTERVAL:
			return action.interval;
		default:
			return state;
	}
}
