import { Observable, Subject, Subscription } from "rxjs/Rx";
import "rxjs/add/operator/map";
import { Quote } from "./quoteModel";
import Tickers from "../assets/tickers-list.json";
import jsonp from "jsonp";

export class QuotesService {
  static base_url = "https://finance.google.com/finance/info";
  static quoteScheduler = new Subscription();
  static quotesMap = new Map();
  static quotePublisher = new Subject();
  static tickers = []; // List of all supported tickers in NASDAQ, NYSE and ASX exchanges

  // Initialize the scheduler, Return the quotes publisher subject to the subscriber
  static init(refInterval) {
    this.quoteScheduler = Observable.timer(0, refInterval).subscribe(() =>
      this.refreshQuotes()
    );
    return this.quotePublisher;
  }

  static getTimer() {
    return this.quotePublisher;
  }

  // Reset the scheduler to the given interval
  static resetTimer(refInterval) {
    this.quoteScheduler.unsubscribe();
    this.quoteScheduler = Observable.timer(0, refInterval).subscribe(() =>
      this.refreshQuotes()
    );
  }

  // Add instrument to the quotes map
  static register(stock, exchg) {
    if (!this.quotesMap.get(exchg + ":" + stock)) {
      this.quotesMap.set(exchg + ":" + stock, new Quote());
    }
  }

  // Remove instrument from the quotes map
  static deregister(stock, exchg) {
    this.quotesMap.delete(exchg + ":" + stock);
  }

  // Clear the quotes map
  static reset() {
    this.quotesMap.clear();
  }

  // Refresh the quotes map with latest quotes from Google Finance API
  static refreshQuotes() {
    if (this.quotesMap.size > 0) {
      let stockcodes = "";

      // create stock codes list, each stock code is in format 'exchange:stockcode'
      this.quotesMap.forEach((value, key) => {
        stockcodes += key + ",";
      });

      let gUrl = `${this.base_url}?client=ig&q=${stockcodes}&format=json`;

      jsonp(gUrl, null, (err, newQuotes) => {
        if (err) {
          console.error(err.message);
        } else {
          this.updateQuotesMap(newQuotes);
          this.quotePublisher.next(this.quotesMap);
        }
      });
    }
  }

  // Update the quotes map with the new quote values from API (called from refreshQuotes method)
  static updateQuotesMap(newquotes) {
    newquotes.forEach(newquote => {
      let quote = this.quotesMap.get(newquote.e + ":" + newquote.t);
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
  static getTickers() {
    if (this.tickers.length === 0) {
      this.tickers = Tickers;
    }
    return this.tickers;
  }
}

export default QuotesService;
