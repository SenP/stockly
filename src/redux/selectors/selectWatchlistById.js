export default function selectWatchlistById(state, id) {
  return state.watchlists.find(wl => wl.id === id);
}
