export default function selectAllStockCodes({ watchlistsById }) {
	return Object.values(watchlistsById)
		.map(wl => Object.keys(wl.stocksByCode))
		.reduce((stocks, stocksInWL) => [...stocks, ...stocksInWL], [])
		.map(stock => stock.split(':')[0])
		.join();
}
