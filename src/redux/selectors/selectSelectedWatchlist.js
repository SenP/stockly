import { createSelector } from 'reselect';
import getWatchlistsById from './getWatchlistsById';
import getSelectedWatchlistId from './getSelectedWatchlistId';

export default createSelector(
	getWatchlistsById,
	getSelectedWatchlistId,
	(watchlistsById, selectedWatchlistId) => (selectedWatchlistId ? watchlistsById[selectedWatchlistId] : null)
);
