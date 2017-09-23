export class Stock {
	code = '';
	name = '';
	unitsOwned = 0;
	avgPrice = 0;
	lastPrice = 0;
	change = 0;
	percentChange = 0;

	get marketValue() {
		return this.unitsOwned > 0 && this.lastPrice > 0 ? this.unitsOwned * this.lastPrice : 0;
	}

	get dayChange() {
		return this.unitsOwned && this.change ? this.unitsOwned * this.change : 0;
	}

	get netPnL() {
		return this.unitsOwned && this.avgPrice && this.lastPrice
			? this.unitsOwned * (this.lastPrice - this.avgPrice)
			: 0;
	}
}

export class Watchlist {
	id = null;
	name = '';
	description = '';
	owner = '';
	createdOn = new Date();
	stocksByCode = {};

	get totalMarketValue() {
		return parseFloat(
			Object.values(this.stocksByCode)
				.reduce((totalV, stock) => totalV + stock.marketValue, 0)
				.toFixed(2)
		);
	}

	get totalDayChange() {
		return parseFloat(
			Object.values(this.stocksByCode)
				.reduce((totalV, stock) => totalV + stock.dayChange, 0)
				.toFixed(2)
		);
	}

	get totalPnL() {
		return parseFloat(
			Object.values(this.stocksByCode)
				.reduce((totalV, stock) => totalV + stock.netPnL, 0)
				.toFixed(2)
		);
	}
}
