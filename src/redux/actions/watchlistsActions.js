import * as actions from "./actionTypes";

export function loadWatchlists() {
  return {
    type: actions.LOAD_WATCHLISTS
  };
}

export function loadWatchlistsSuccess(watchlists) {
  return {
    type: actions.LOAD_WATCHLISTS_SUCCESS,
    watchlists
  };
}

export function createWatchlist(watchlist) {
  return {
    type: actions.CREATE_WATCHLIST,
    watchlist
  };
}

export function createWatchlistSuccess(watchlist) {
  return {
    type: actions.CREATE_WATCHLIST_SUCCESS,
    watchlist
  };
}

export function createWatchlistError(watchlist) {
  return {
    type: actions.CREATE_WATCHLIST_ERROR,
    watchlist
  };
}


export function editWatchlist(watchlist) {
  return {
    type: actions.EDIT_WATCHLIST,
    watchlist
  };
}

export function deleteWatchlist(watchlist) {
  return {
    type: actions.DELETE_WATCHLIST,
    watchlist
  };
}

export function fetchQuotesSuccess(quotes) {
  return {
    type: actions.FETCH_QUOTES_SUCCESS,
    quotes
  };
}
