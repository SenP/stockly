export default function selectWatchlists({ watchlistsById }) {
	return Object.keys(watchlistsById).map(id => watchlistsById[id]);
}
