import { Stock, Watchlist } from "./watchlistModel";
import { QuotesService } from "./index";
import SampleWatchlists from "./SampleWatchlists";

function cloneWatchlist(watchlist) {
  let newWL = Object.assign(new Watchlist(), watchlist);
  newWL.stocks = []; //reset so we can create and assign watchlist items
  watchlist.stocks.forEach(stock => {
    let newStock = Object.assign(new Stock(), stock);
    newWL.stocks.push(newStock);
  });
  return newWL;
}

function cloneWatchlists(baseWatchlists) {
  let watchlists = [];
  baseWatchlists.forEach(wl => {
    watchlists.push(cloneWatchlist(wl));
  });
  return watchlists;
}

export class WatchlistService {
  static watchlists = [];
  static simDelay = 2000;

  static getWatchlists() {
    let watchlists = [];
    try {
      let watchlistsRaw = JSON.parse(localStorage.getItem("fpwatchlists"));
      if (watchlistsRaw && watchlistsRaw.length > 0) {
        watchlists = cloneWatchlists(watchlistsRaw);
      } else {
        watchlists = cloneWatchlists(SampleWatchlists);
      }
    } catch (e) {
      console.log(e);
      watchlists = [];
    }
    this.watchlists = watchlists; // copy for db simulation
    return cloneWatchlists(watchlists); // return a copy as app state
  }

  static saveWatchlistsToStorage() {
    localStorage.setItem("fpwatchlists", JSON.stringify(this.watchlists));
  }

  static validateWatchlist(watchlist, isAdding = false) {
    let i = this.watchlists.findIndex(wl => wl.id === watchlist.id);

    if (isAdding && i === -1 && this.watchlists.length === 10) {
      //watchlist limit reached
      return {
        status: "error",
        msg: "Can not create more than 10 watchlists"
      };
    }

    let dupIndex = this.watchlists.findIndex(
      wl => wl.id !== watchlist.id && wl.name === watchlist.name
    );
    if (dupIndex !== -1) {
      //duplicate name found
      return {
        status: "error",
        msg: "Watchlist with this name already exists"
      };
    }

    return { status: "success" };
  }

  // Save a watchlist, simulate http post delay
  static saveWatchlist(wl) {
    return new Promise(resolve =>
      setTimeout(() => {
        resolve(this.doSaveWatchlist(wl));
      }, this.simDelay)
    );
  }

  // save the edited/new watchlist
  static doSaveWatchlist(wlist) {
    let i = this.watchlists.findIndex(wl => wl.id === wlist.id);
    let data = null;

    if (i !== -1) {
      //Edit watchlist
      this.watchlists[i].name = wlist.name;
      this.watchlists[i].description = wlist.description;
      data = cloneWatchlist(wlist);
    } else {
      //Create New watchlist
      let newWL = Object.assign(new Watchlist(), wlist);
      newWL.id =
        this.watchlists.reduce(
          (prev, curr) => (prev.id > curr.id ? prev : curr),
          { id: 0 }
        ).id + 1;
      newWL.stocks = [];
      this.watchlists.push(newWL);
      data = cloneWatchlist(newWL);
    }
    this.saveWatchlistsToStorage();
    return { status: "success", data: data };
  }

  static validateStock(watchlist, stock, isAdding = false) {
    let result = { status: "success", msg: "success" };

    if (isAdding) {
      //validate stock code
      // validate length
      if (stock.code.length < 3 || stock.code.length > 12) {
        result.status = "error";
        result.msg = "Stock code should be between 3 to 12 characters";
        return result;
      }

      // check duplicates
      if (watchlist.stocks.findIndex(stk => stk.code === stock.code) !== -1) {
        result.status = "error";
        result.msg = "'" + stock.code + "' already exists in this watchlist";
        return result;
      }

      // validate ticker code
      if (QuotesService.searchTickers(stock.code, true).length === 0) {
        return {
          status: "error",
          msg: "Invalid stock code"
        };
      } else if (watchlist.stocks.length === 30) {
        //stocks limit reached
        return {
          status: "error",
          msg: "Can not have more than 30 stocks in a watchlist"
        };
      }
    }

    // validate quantity
    if (isNaN(stock.unitsOwned)) {
      result.status = "error";
      result.msg = "'Units owned' should be a number";
      return result;
    }
    if (stock.unitsOwned < 1 || stock.unitsOwned > 999999999) {
      result.status = "error";
      result.msg = "'Units owned' should be between 1 to 1 billion";
      return result;
    }
    // validate avg price
    if (isNaN(stock.avgPrice)) {
      result.status = "error";
      result.msg = "'Buy price' should be a number";
      return result;
    }
    if (stock.avgPrice <= 0 || stock.avgPrice >= 10000) {
      result.status = "error";
      result.msg = "'Buy price' should be more than 0 and less than 10000";
      return result;
    }
    return result;
  }

  // Save a stock, simulate http post delay
  static saveStock(stock, wlist) {
    let p = new Promise(resolve =>
      setTimeout(() => {
        resolve(this.doSaveStock(stock, wlist));
      }, this.simDelay)
    );

    return p;
  }

  // save the edited/new stock
  static doSaveStock(stock, wlist) {
    let wl = this.watchlists[this.watchlists.findIndex(w => w.id === wlist.id)];
    let i = wl.stocks.findIndex(stk => stk.code === stock.code);
    let data = null;

    if (i !== -1) {
      //edit
      Object.assign(wl.stocks[i], stock);
      data = Object.assign({}, wl.stocks[i]);
    } else {
      //create
      wl.stocks.push(Object.assign(new Stock(), stock));
      QuotesService.register(stock.code);
      data = Object.assign({}, wl.stocks[wl.stocks.length - 1]);
    }
    this.saveWatchlistsToStorage();
    return { status: "success", data: data };
  }

  // simulate http delete of watchlist
  static deleteWatchlist(wlist) {
    let p = new Promise(resolve =>
      setTimeout(() => {
        resolve(this.doRemoveWatchlist(wlist));
      }, this.simDelay)
    );

    return p;
  }

  // remove the selected watchlist
  static doRemoveWatchlist(wlist) {
    let i = this.watchlists.findIndex(w => w.id === wlist.id);

    if (i !== -1) {
      this.watchlists.splice(i, 1);
      // deregister stock from quotes service
      if (wlist.stocks.length > 0) {
        wlist.stocks.forEach(stock => QuotesService.deregister(stock.code));
      }
      this.saveWatchlistsToStorage();
      return { status: "success", data: wlist };
    }
    return { status: "success", data: null };
  }

  // simulate http delete of watchlist item
  static deleteStock(stock, wlist) {
    let p = new Promise(resolve =>
      setTimeout(() => {
        resolve(this.doRemoveStock(stock, wlist));
      }, this.simDelay)
    );

    return p;
  }

  // remove the selected watchlist item
  static doRemoveStock(stock, wlist) {
    let wl = this.watchlists[this.watchlists.findIndex(w => w.id === wlist.id)];
    let i = wlist.stocks.findIndex(stk => stk.code === stock.code);
    if (i !== -1) {
      wl.stocks.splice(i, 1);
      QuotesService.deregister(stock.code);
      this.saveWatchlistsToStorage();
      return { status: "success", data: stock };
    }
    return { status: "success", data: null };
  }
}
export default WatchlistService;
