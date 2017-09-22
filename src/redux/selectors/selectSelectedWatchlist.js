import { createSelector } from 'reselect';
import getWatchlistsById from './getWatchlistsById';

const getSelectedWatchlistId = state => state.selectedWatchlistId;

export default createSelector(
	getWatchlistsById,
	getSelectedWatchlistId,
	(watchlistsById, selectedWatchlistId) => (selectedWatchlistId ? watchlistsById[selectedWatchlistId] : null)
);
