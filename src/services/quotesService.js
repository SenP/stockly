import Tickers from '../assets/tickers-list.json';
import fetchJsonp from 'fetch-jsonp';

export class QuotesService {
	static base_url = 'https://finance.google.com/finance/info';
	static tickers = []; // List of all supported tickers in NASDAQ, NYSE and ASX exchanges

	// Refresh the quotes map with latest quotes from Google Finance API
	static async refreshQuotes(stockCodes) {
		if (stockCodes) {
			const gUrl = `${this.base_url}?q=${stockCodes}&format=json`;
			let newQuotes;
			let quotesMap;
			try {
				let response = await fetchJsonp(gUrl);
				newQuotes = await response.json();
			} catch (err) {
				console.error('error fetching, switching to random quotes...');
				newQuotes = this.generateRandomQuotes(stockCodes);
			}
			quotesMap = this.createQuotesMap(newQuotes);
			if (stockCodes.split(',').length === 1) {
				const newQuote = quotesMap.get(stockCodes);
				return new Map().set(stockCodes, newQuote);
			}
			return quotesMap;
		}
		return null;
	}

	// Create the quotes map with the new quote values from API (called from refreshQuotes method)
	static createQuotesMap(newquotes) {
		let quotesMap = new Map();
		newquotes.forEach(newquote => {
			let quote = {};
			quote.lastPrice = parseFloat(newquote.l.replace(',', '')) * (1 + (Math.random() > 0.5 ? 1 : -1) * 0.1);
			quote.change = parseFloat(newquote.c.replace(',', '')) + (Math.random() - 0.5);
			quote.percentChange = parseFloat(newquote.cp) + (Math.random() - 0.5);
			quotesMap.set(newquote.t, quote);
		});
		return quotesMap;
	}

	// Create random quotes - fallback for Google Finance API
	static generateRandomQuotes(stockCodes) {
		let newQuotes = [];
		stockCodes.split(',').forEach(code => {
			newQuotes.push({
				t: code,
				l: String(500 * Math.random()),
				c: String(Math.random() - 0.5),
				cp: String(Math.random() - 0.5)
			});
		});
		return newQuotes;
	}

	static searchTickers(value, exact = false) {
		if (exact) {
			return Tickers.filter(ticker => ticker.code === value || ticker.name === value);
		}
		const inputValue = value.trim().toLowerCase();
		const inputLength = inputValue.length;
		return Tickers.filter(
			ticker =>
				ticker.code.toLowerCase().slice(0, inputLength) === inputValue ||
				ticker.name.toLowerCase().slice(0, inputLength) === inputValue
		);
	}
}
