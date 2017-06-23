import { Quote } from "./quoteModel";
import Tickers from "../assets/tickers-list.json";
import jsonp from "jsonp";

export class QuotesService {
  static base_url = "https://finance.google.com/finance/info";
  static quotesMap = new Map();
  static tickers = []; // List of all supported tickers in NASDAQ, NYSE and ASX exchanges

  static register(stockCode) {
    if (!this.quotesMap.get(stockCode)) {
      this.quotesMap.set(stockCode, new Quote());
    }
  }

  static deregister(stockCode) {
    this.quotesMap.delete(stockCode);
  }

  static reset() {
    this.quotesMap.clear();
  }

  // Refresh the quotes map with latest quotes from Google Finance API
  static refreshQuotes() {
    if (this.quotesMap.size > 0) {
      let stockcodes = "";

      // create stock codes list, each stock code is in format 'exchange:stockcode'
      this.quotesMap.forEach((value, key) => {
        let [code, exchange] = key.split(":");
        stockcodes += exchange + ":" + code + ",";
      });

      let gUrl = `${this.base_url}?client=ig&q=${stockcodes}&format=json`;

      return new Promise((resolve, reject) => {
        jsonp(gUrl, null, (err, newQuotes) => {
          if (err) {
            console.error(err.message);
            resolve(null);
          } else {
            this.updateQuotesMap(newQuotes);
            resolve(this.quotesMap);
          }
        });
      });
    }
    return Promise.resolve(null);
  }

  // Update the quotes map with the new quote values from API (called from refreshQuotes method)
  static updateQuotesMap(newquotes) {
    console.log(newquotes);
    newquotes.forEach(newquote => {
      let quote = this.quotesMap.get(newquote.t + ":" + newquote.e);
      if (quote) {
        quote.lastPrice =
          parseFloat(newquote.l.replace(",", "")) *
          (1 + (Math.random() > 0.5 ? 1 : -1) * 0.1);
        quote.change =
          parseFloat(newquote.c.replace(",", "")) + (Math.random() - 0.5);
        quote.percentChange = parseFloat(newquote.cp) + (Math.random() - 0.5);
      }
    });
  }

  // Utility method to load list of tickers from tickers-list.json
  static loadTickers() {
    if (this.tickers.length === 0) {
      this.tickers = Tickers;
    }
    return this.tickers;
  }

  static searchTickers(value, exact = false) {
    if (exact) {
      return this.tickers.filter(
        ticker => ticker.code === value || ticker.name === value
      );
    }
    let inputValue = value.trim().toLowerCase();
    let inputLength = inputValue.length;
    return this.tickers.filter(
      ticker =>
        ticker.code.toLowerCase().slice(0, inputLength) === inputValue ||
        ticker.name.toLowerCase().slice(0, inputLength) === inputValue
    );
  }
}

// export default QuotesService;
