import { createSelector } from 'reselect';
import getWatchlistsById from './getWatchlistsById';

export default createSelector(getWatchlistsById, watchlistsById =>
	Object.values(watchlistsById)
		.map(wl => Object.keys(wl.stocksByCode))
		.reduce((stocks, stocksInWL) => [...stocks, ...stocksInWL], [])
		.map(stock => stock.split(':')[0])
		.join()
);
