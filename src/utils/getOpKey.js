import { WATCHLIST, STOCK } from '../redux/actions/scopes';

export default function getOpKey(scope, payload) {
	switch (scope) {
		case WATCHLIST: {
			const { watchlist, op } = payload;
			return watchlist && watchlist.id ? `${scope}-${watchlist.id}-${op}` : `${scope}-${op}`;
		}
		case STOCK: {
			const { stock, watchlist, op } = payload;
			return stock && stock.code && op !== 'ADD'
				? `${scope}-${watchlist.id}-${stock.code}-${op}`
				: `${scope}-${watchlist.id}-${op}`;
		}
		default:
			return payload.key;
	}
}
