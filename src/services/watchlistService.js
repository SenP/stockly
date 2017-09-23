import { Stock, Watchlist } from './watchlistModel';
import { QuotesService } from './index';
import SampleWatchlists from './SampleWatchlists';

function cloneWatchlist(watchlist) {
	let newWL = Object.assign(new Watchlist(), watchlist);
	newWL.stocks = []; // reset and create & assign stocks
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
	static simDelay = 1000;

	static getWatchlists() {
		let watchlists = [];
		try {
			const watchlistsRaw = JSON.parse(localStorage.getItem('fpwatchlists'));
			watchlists =
				watchlistsRaw && watchlistsRaw.length > 0
					? cloneWatchlists(watchlistsRaw)
					: cloneWatchlists(SampleWatchlists);
		} catch (e) {
			console.log(e);
			watchlists = [];
		}
		this.watchlists = watchlists; // copy for db simulation
		return cloneWatchlists(watchlists); // return a copy as app state
	}

	static saveWatchlistsToStorage() {
		localStorage.setItem('fpwatchlists', JSON.stringify(this.watchlists));
	}

	static validateWatchlist(watchlist) {
		const i = this.watchlists.findIndex(wl => wl.id === watchlist.id);
		if (watchlist.id === null && i === -1 && this.watchlists.length === 10) {
			return {
				status: 'error',
				msg: 'Can not create more than 10 watchlists'
			};
		}

		const dupIndex = this.watchlists.findIndex(wl => wl.id !== watchlist.id && wl.name === watchlist.name);
		if (dupIndex !== -1) {
			return {
				status: 'error',
				msg: 'Watchlist with this name already exists'
			};
		}

		return { status: 'success' };
	}

	// Save a watchlist, simulate http post delay
	static saveWatchlist(wl) {
		return new Promise(resolve => setTimeout(() => resolve(this.doSaveWatchlist(wl)), this.simDelay));
	}

	// save the edited/new watchlist
	static doSaveWatchlist(wlist) {
		// Simulate error
		if (wlist.name === 'test55') return { status: 'error in name', data: null };
		// end simulate error
		const i = this.watchlists.findIndex(wl => wl.id === wlist.id);
		let data = null;
		if (i !== -1) {
			//Edit watchlist
			this.watchlists[i].name = wlist.name;
			this.watchlists[i].description = wlist.description;
			data = cloneWatchlist(this.watchlists[i]);
		} else {
			//Create New watchlist
			let newWL = Object.assign(new Watchlist(), wlist);
			newWL.id = this.watchlists.reduce((prev, curr) => (prev.id > curr.id ? prev : curr), { id: 0 }).id + 1;
			newWL.stocks = [];
			this.watchlists.push(newWL);
			data = cloneWatchlist(newWL);
		}
		this.saveWatchlistsToStorage();
		return { status: 'success', data: data };
	}

	static validateStock(watchlist, stock, isAdding = false) {
		let result = { status: 'success', msg: 'success' };

		if (isAdding) {
			// validate stock code
			if (stock.code.length < 3 || stock.code.length > 12) {
				result.status = 'error';
				result.msg = 'Stock code should be between 3 to 12 characters';
				return result;
			}
			// check duplicates
			if (watchlist.stocksByCode[`${stock.code}`]) {
				result.status = 'error';
				result.msg = "'" + stock.code + "' already exists in this watchlist";
				return result;
			}
			// validate ticker code
			if (QuotesService.searchTickers(stock.code, true).length === 0) {
				return {
					status: 'error',
					msg: 'Invalid stock code'
				};
			} else if (Object.keys(watchlist.stocksByCode).length === 30) {
				//stocks limit reached
				return {
					status: 'error',
					msg: 'Can not have more than 30 stocks in a watchlist'
				};
			}
		}
		// validate quantity
		if (isNaN(stock.unitsOwned)) {
			result.status = 'error';
			result.msg = "'Units owned' should be a number";
			return result;
		}
		if (
			parseFloat(stock.unitsOwned) !== parseInt(stock.unitsOwned, 10) ||
			stock.unitsOwned < 1 ||
			stock.unitsOwned > 999999999
		) {
			result.status = 'error';
			result.msg = "'Units owned' should be an integer between 1 to 1 billion";
			return result;
		}

		// validate avg price
		if (isNaN(stock.avgPrice)) {
			result.status = 'error';
			result.msg = "'Buy price' should be a number";
			return result;
		}
		if (stock.avgPrice <= 0 || stock.avgPrice >= 10000) {
			result.status = 'error';
			result.msg = "'Buy price' should be more than 0 and less than 10000";
			return result;
		}
		return result;
	}

	static saveStock(stock, wlist) {
		return new Promise(resolve => setTimeout(() => resolve(this.doSaveStock(stock, wlist)), this.simDelay));
	}

	static doSaveStock(stock, wlist) {
		// Simulate error
		// if (
		//   stock.unitsOwned === "55"
		// )
		//   return { status: "error in qty", data: null };
		// end simulate error
		const wlIdx = this.watchlists.findIndex(w => w.id === wlist.id);
		if (wlIdx === -1) {
			return { status: 'Watchlist does not exist', data: null };
		}
		let wl = this.watchlists[wlIdx];
		const i = wl.stocks.findIndex(stk => stk.code === stock.code);
		let data = null;

		if (i !== -1) {
			//edit
			Object.assign(wl.stocks[i], stock);
			data = Object.assign(new Stock(), wl.stocks[i]);
		} else {
			//create
			wl.stocks.push(Object.assign(new Stock(), stock));
			data = Object.assign(new Stock(), wl.stocks[wl.stocks.length - 1]);
		}
		this.saveWatchlistsToStorage();
		return { status: 'success', data: data };
	}

	static deleteWatchlist(wl) {
		return new Promise(resolve => setTimeout(() => resolve(this.doRemoveWatchlist(wl)), this.simDelay));
	}

	static doRemoveWatchlist(wlist) {
		// Simulate error
		if (wlist.name === 'test555') return { status: 'error in name', data: null };
		// end simulate error
		const i = this.watchlists.findIndex(w => w.id === wlist.id);
		if (i !== -1) {
			this.watchlists.splice(i, 1);
			this.saveWatchlistsToStorage();
			return { status: 'success', data: wlist };
		}
		return { status: 'success', data: null };
	}

	static deleteStock(stock, wlist) {
		return new Promise(resolve => setTimeout(() => resolve(this.doRemoveStock(stock, wlist)), this.simDelay));
	}

	static doRemoveStock(stock, wlist) {
		// if (
		//   stock.unitsOwned === "55" //REMOVE
		// )
		//   return { status: "delete error in qty", data: null };
		const wlIdx = this.watchlists.findIndex(w => w.id === wlist.id);
		if (wlIdx === -1) {
			return { status: 'success', data: null };
		}
		let wl = this.watchlists[wlIdx];
		const i = wl.stocks.findIndex(stk => stk.code === stock.code);
		if (i !== -1) {
			wl.stocks.splice(i, 1);
			this.saveWatchlistsToStorage();
			return { status: 'success', data: stock };
		}
		return { status: 'success', data: null };
	}
}

export default WatchlistService;
