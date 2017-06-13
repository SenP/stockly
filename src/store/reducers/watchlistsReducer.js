import * as types from '../actions/actionTypes.js';
import initialState from '../index';
import {WatchlistService} from '../../services';

export default function watchlistsReducer(state=initialState.watchlists, action) {
  swich(action.type) {
    case types.LOAD_WATCHLISTS:
      WatchlistService.getWatchlists().then(watchlists => {
      return watchlists;        
        watchlists.forEach(wl => {
          wl.stocks.forEach(stock => {
            QuotesService.register(stock.code);
          });
        });
      }
    });


  }
}
