import { Stock, Watchlist } from "./watchlistModel";
import QuotesService from "./quotesService";
import SampleWatchlists from "./SampleWatchlists";

export class WatchlistService {
  static watchlists = [];
  static simDelay = 1000;

  static getWatchlists() {
    // Retrieve watchlists from local storage
    return new Promise(resolve => {
      if (this.watchlists.length === 0) {
        let watchlistsRaw = JSON.parse(localStorage.getItem("fpwatchlists"));
        if (watchlistsRaw && watchlistsRaw.length > 0) {
          watchlistsRaw.forEach(wlraw => {
            let newWL = Object.assign(new Watchlist(), wlraw);
            newWL.stocks = []; //reset so we can create and assign watchlist items
            wlraw.stocks.forEach(stock => {
              let newStock = Object.assign(new Stock(), stock);
              newWL.stocks.push(newStock);
            });
            this.watchlists.push(newWL);
          });
        } else {
          this.watchlists = SampleWatchlists;
        }
      }
      resolve(this.watchlists);
    });
  }

  // Update all stocks in all watchlists with the new quotes
  static updateQuotes(qmap) {
    console.log("new quotes:", qmap);
    return new Promise(resolve => {
      this.watchlists.forEach(wl => {
        wl.stocks.forEach(stock => {
          let quote = qmap.get(stock.code);
          if (quote) {
            stock.lastPrice = quote.lastPrice || 0;
            stock.change = quote.change || 0;
            stock.percentChange = quote.percentChange || 0;
          }
        });
      });
      resolve(true);
    });
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

    let dupName = this.watchlists.findIndex(
      wl => wl.id !== wlist.id && wl.name === wlist.name
    );
    if (dupName !== -1) {
      //duplicate name found
      return { status: "error", msg: "Duplicate watchlist name" };
    }

    if (i === -1 && this.watchlists.length === 10) {
      //watchlist limit reached
      return { status: "error", msg: "Can not create more than 10 watchlists" };
    }

    if (i !== -1) {
      //Edit watchlist
      Object.assign(this.watchlists[i], wlist);
      data = this.watchlists[i];
    } else {
      //Create New watchlist
      wlist.id =
        this.watchlists.reduce(
          (prev, curr) => (prev.id > curr.id ? prev : curr),
          { id: 0 }
        ).id + 1;
      wlist.stocks = [];
      this.watchlists.push(Object.assign(new Watchlist(), wlist));
      data = this.watchlists[this.watchlists.length - 1];
    }
    localStorage.setItem("fpwatchlists", JSON.stringify(this.watchlists));
    return { status: "success", data: data };
  }

  // Save a stock, simulate http post delay
  static saveStock(wlist, stock) {
    let p = new Promise(resolve =>
      setTimeout(() => {
        resolve(this.doSaveStock(wlist, stock));
      }, this.simDelay)
    );

    return p;
  }

  // save the edited/new stock
  static doSaveStock(wlist, stock) {
    let wl = this.watchlists[this.watchlists.findIndex(w => w.id === wlist.id)];
    let i = wl.stocks.findIndex(stk => stk.code === stock.code);
    let data = null;

    if (i === -1) {
      // validate ticker code
      if (
        QuotesService.getTickers().filter(ticker => ticker.code === stock.code)
          .length === 0
      ) {
        return {
          status: "error",
          msg: "Invalid stock code"
        };
      } else if (wl.stocks.length === 30) {
        //stocks limit reached
        return {
          status: "error",
          msg: "Can not have more than 30 stocks in a watchlist"
        };
      }
    }

    if (i !== -1) {
      //edit
      Object.assign(wl.stocks[i], stock);
      data = wl.stocks[i];
    } else {
      //create
      wl.stocks.push(Object.assign(new Stock(), stock));
      QuotesService.register(stock.code);
      data = wl.stocks[wl.stocks.length - 1];
    }
    localStorage.setItem("fpwatchlists", JSON.stringify(this.watchlists));
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
      localStorage.setItem("fpwatchlists", JSON.stringify(this.watchlists));
      return { status: "success", data: wlist };
    }
    return { status: "success", data: null };
  }

  // simulate http delete of watchlist item
  static deleteStock(wlist, stock) {
    let p = new Promise(resolve =>
      setTimeout(() => {
        resolve(this.doRemoveStock(wlist, stock));
      }, this.simDelay)
    );

    return p;
  }

  // remove the selected watchlist item
  static doRemoveStock(wlist, stock) {
    // let wl = this.watchlists[this.watchlists.findIndex(w => w.id === wlist.id)];
    let i = wlist.stocks.findIndex(stk => stk.code === stock.code);
    if (i !== -1) {
      wlist.stocks.splice(i, 1);
      QuotesService.deregister(stock.code);
      localStorage.setItem("fpwatchlists", JSON.stringify(this.watchlists));
      return { status: "success", data: stock };
    }
    return { status: "success", data: null };
  }
}
export default WatchlistService;
