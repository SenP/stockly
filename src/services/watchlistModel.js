export class WatchlistItem {
  instrument = "";
  exchange = "";
  unitsOwned = 0;
  avgPrice = 0;
  lastPrice = 0;
  change = 0;
  percentChange = 0;

  get marketValue() {
    if (this.unitsOwned > 0 && this.lastPrice > 0) {
      return this.unitsOwned * this.lastPrice;
    }
    return 0;
  }

  get dayChange() {
    if (this.unitsOwned && this.change) {
      return this.unitsOwned * this.change;
    }
    return 0;
  }

  get netPnL() {
    if (this.unitsOwned && this.avgPrice && this.lastPrice) {
      return this.unitsOwned * (this.lastPrice - this.avgPrice);
    }
    return 0;
  }
}

export class Watchlist {
  id = null;
  name = "";
  description = "";
  owner = "";
  createdOn = new Date();
  instruments = [];

  get totalMarketValue() {
    let total = this.instruments.reduce(
      (totalV, wl) => totalV + wl.marketValue,
      0
    );
    return parseFloat(total.toFixed(2));
  }

  get totalDayChange() {
    let total = this.instruments.reduce(
      (totalV, wl) => totalV + wl.dayChange,
      0
    );
    return parseFloat(total.toFixed(2));
  }

  get totalPnL() {
    let total = this.instruments.reduce((totalV, wl) => totalV + wl.netPnL, 0);
    return parseFloat(total.toFixed(2));
  }
}
