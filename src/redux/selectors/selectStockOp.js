export default function selectStockOp(state, stock, watchlist, op) {
	const opKey = stock ? `${watchlist.id}-${stock.code}-${op}` : `${watchlist.id}-${op}`;
	return state.stocksOpByKey[opKey];
}
