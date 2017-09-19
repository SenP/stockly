export default function selectSelectedWatchlist({ watchlistsById, selectedWatchlistId }) {
	return selectedWatchlistId ? watchlistsById[selectedWatchlistId] : null;
}
