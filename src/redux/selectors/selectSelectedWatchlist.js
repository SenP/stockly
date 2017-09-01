import { Watchlist } from '../../services';

export default function selectSelectedWatchlist({ watchlistsById, selectedWatchlistId }) {
	if (selectedWatchlistId) {
		let selected = Object.assign(new Watchlist(), watchlistsById[selectedWatchlistId]);
		selected.stocks = Object.values(selected.stocksByCode);
		return selected;
	} else return null;
}
