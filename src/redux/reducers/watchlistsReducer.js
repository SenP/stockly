import * as types from "../actions/actionTypes.js";
import initialState from "../initialState";
import { WatchlistService } from "../../services";
import watchlistReducer from "./watchlistReducer";

export default function(state = initialState.watchlists, action) {
  switch (action.type) {
    case types.LOAD_WATCHLISTS:
      return WatchlistService.getWatchlists();

    case types.FETCH_QUOTES_SUCCESS:
      return state.map(wl => watchlistReducer(wl, action));

    case types.CREATE_WATCHLIST:
      return [...state, watchlistReducer(undefined, action)];

    case types.EDIT_WATCHLIST:
    case types.ADD_STOCK:
    case types.EDIT_STOCK:
    case types.DELETE_STOCK:
      return editWatchlist(state, action);

    case types.DELETE_WATCHLIST:
      return deleteWatchlist(state, action);

    default:
      return state;
  }
}

function editWatchlist(state, action) {
  let i = state.findIndex(w => w.id === action.watchlist.id);
  if (i !== -1) {
    return [
      ...state.slice(0, i),
      watchlistReducer(...state.slice(i, i + 1), action),
      ...state.slice(i + 1)
    ];
  } else {
    return state;
  }
}

function deleteWatchlist(state, action) {
  WatchlistService.doRemoveWatchlist(action.watchlist);
  let i = state.findIndex(w => w.id === action.watchlist.id);
  if (i !== -1) {
    return [...state.slice(0, i), ...state.slice(i + 1)];
  } else {
    return state;
  }
}
