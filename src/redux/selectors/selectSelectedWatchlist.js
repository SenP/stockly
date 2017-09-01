export default function selectSelectedWatchlist({ watchlistsById, selectedWatchlistId }) {
	if (selectedWatchlistId) {
		let selected = { ...watchlistsById[selectedWatchlistId] };
		selected.stocks = Object.values(selected.stocksById);
		return selected;
	} else return null;
}
