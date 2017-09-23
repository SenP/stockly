import * as actions from './actionTypes';

export const selectWatchlist = watchlist => ({ type: actions.SELECT_WATCHLIST, watchlist });
export const loadWatchlists = () => ({ type: actions.LOAD_WATCHLISTS });
export const loadWatchlistsSuccess = watchlists => ({ type: actions.LOAD_WATCHLISTS_SUCCESS, watchlists });
export const createWatchlist = watchlist => ({ type: actions.CREATE_WATCHLIST, watchlist });
export const editWatchlist = watchlist => ({ type: actions.EDIT_WATCHLIST, watchlist });
export const saveWatchlistSuccess = watchlist => ({ type: actions.SAVE_WATCHLIST_SUCCESS, watchlist });
export const deleteWatchlist = watchlist => ({ type: actions.DELETE_WATCHLIST, watchlist });
export const deleteWatchlistSuccess = watchlist => ({ type: actions.DELETE_WATCHLIST_SUCCESS, watchlist });
