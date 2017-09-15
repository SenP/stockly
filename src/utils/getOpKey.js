import { WATCHLIST, STOCK } from '../redux/actions/scopes';

export default function getOpKey(scope, payload) {
	switch (scope) {
		case WATCHLIST: {
			let { watchlist, op } = payload;
			return watchlist && watchlist.id ? `${scope}-${watchlist.id}-${op}` : `${scope}-${op}`;
		}
		case STOCK: {
			let { stock, watchlist, op } = payload;
			return stock && stock.code
				? `${scope}-${watchlist.id}-${stock.code}-${op}`
				: `${scope}-${watchlist.id}-${op}`;
		}
		default:
			return payload.key;
	}
}
