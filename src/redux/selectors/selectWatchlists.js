import { createSelector } from 'reselect';
import getWatchlistsById from './getWatchlistsById';

export default createSelector(getWatchlistsById, watchlistsById => Object.values(watchlistsById));
