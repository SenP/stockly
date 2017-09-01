export default function selectAllStockCodes({ watchlistsById }) {
	return Object.values(watchlistsById)
		.map(wl => Object.keys(wl.stocksByCode))
		.map(stocks => stocks.map(stock => stock.split(':')[0]))
		.join();
}
