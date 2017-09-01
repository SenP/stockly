import { Quote } from './quoteModel';
import Tickers from '../assets/tickers-list.json';
import jsonp from 'jsonp';

export class QuotesService {
	static base_url = 'https://finance.google.com/finance/info';
	static quotesMap = new Map();
	static tickers = []; // List of all supported tickers in NASDAQ, NYSE and ASX exchanges

	static register(stock) {
		if (!this.quotesMap.get(stock.code)) {
			this.quotesMap.set(stock.code, new Quote());
		}
	}

	static deregister(stock) {
		this.quotesMap.delete(stock.code);
	}

	static reset() {
		this.quotesMap.clear();
	}

	// Refresh the quotes map with latest quotes from Google Finance API
	static refreshQuotes(stock) {
		let stockcodes = '';

		if (stock) {
			stockcodes = stock.code.split(':')[0];
		} else if (this.quotesMap.size > 0) {
			// create stock codes list, exchage code not required now
			this.quotesMap.forEach((value, key) => {
				let stockcode = key.split(':')[0];
				stockcodes = `${stockcode},${stockcodes}`;
			});
		}

		if (stockcodes !== '') {
			let gUrl = `${this.base_url}?q=${stockcodes}&format=json`;

			return new Promise((resolve, reject) => {
				jsonp(gUrl, null, (err, newQuotes) => {
					if (err) {
						console.error(err.message);
						resolve(null);
					} else {
						this.updateQuotesMap(newQuotes);
						if (stock) {
							let newQuote = this.quotesMap.get(stock.code);
							resolve(new Map().set(stock.code, newQuote));
						}
						resolve(this.quotesMap);
					}
				});
			});
		}
		return Promise.resolve(null);
	}

	// Update the quotes map with the new quote values from API (called from refreshQuotes method)
	static updateQuotesMap(newquotes) {
		newquotes.forEach(newquote => {
			let quote = this.quotesMap.get(newquote.t + ':' + newquote.e);
			if (quote) {
				quote.lastPrice = parseFloat(newquote.l.replace(',', '')) * (1 + (Math.random() > 0.5 ? 1 : -1) * 0.1);
				quote.change = parseFloat(newquote.c.replace(',', '')) + (Math.random() - 0.5);
				quote.percentChange = parseFloat(newquote.cp) + (Math.random() - 0.5);
			}
		});
	}

	static searchTickers(value, exact = false) {
		if (exact) {
			return Tickers.filter(ticker => ticker.code === value || ticker.name === value);
		}
		let inputValue = value.trim().toLowerCase();
		let inputLength = inputValue.length;
		return Tickers.filter(
			ticker =>
				ticker.code.toLowerCase().slice(0, inputLength) === inputValue ||
				ticker.name.toLowerCase().slice(0, inputLength) === inputValue
		);
	}
}
