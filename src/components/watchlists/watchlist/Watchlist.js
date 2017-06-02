import { Component, OnChanges, Input, ViewChild } from '@angular/core';
import { WatchlistService, Watchlist, WatchlistItem, QuoteService } from '../common';

@Component({
    selector: 'fp-watchlist',
    templateUrl: './watchlist.component.html',
    styles: [`           
                .panel-heading {
                    font-size: 2em;
                }                
            `]
})

export class WatchlistComponent implements OnChanges {

    @Input() watchlist: Watchlist = null;

    editedItem: WatchlistItem;
    isEditing: boolean = false;
    isAdding: boolean = false;
    isDeleting: boolean = false;

    msg: string = "";
    msgClass: string;
    msgClasses = {
        error: " msg text-center text-danger",
        info: "msg text-center text-info"
    }

    tickers = [];
    selectStkCode;
    selectStkName;

    @ViewChild('editCode') editCode;
    @ViewChild('editUnits') editUnits;

    constructor(private watchlistService: WatchlistService,
        private quoteService: QuoteService) {
        this.tickers = this.quoteService.getTickers();
    }

    ngOnChanges() {
        this.isEditing = false;
        this.isAdding = false;
        this.isDeleting = false;
    }

    addWatchlistItem() {
        this.isAdding = true;
        this.editedItem = new WatchlistItem();
        setTimeout(() => this.editCode.nativeElement.focus(), 100);
    }

    editWatchlistItem(stock: WatchlistItem) {
        this.isEditing = true;
        this.editedItem = Object.assign(new WatchlistItem(), stock);
        this.selectStkCode = this.editedItem.instrument;
        this.selectStkName = this.tickers.filter(t => t.Symbol === stock.instrument)[0].Name;
        setTimeout(() => this.editUnits.nativeElement.focus(), 100);
    }

    onStockSelect(t) {
        this.editedItem.exchange = t.item.Exchange;
        this.selectStkCode = t.item.Symbol;
        this.selectStkName = t.item.Name;
    }

    saveWatchlistItem() {
        let valid = this.validateWatchlistItem();
        if (valid.status === "error") {
            this.msg = valid.msg;
            this.msgClass = this.msgClasses.error;
        }
        else {
            this.msg = "Saving...please wait.";
            this.msgClass = this.msgClasses.info;
            this.watchlistService
                .saveWatchlistItem(this.watchlist, this.editedItem)
                .then(res => {
                    this.resetView();
                });
        }
    }

    //validate edited watchlist item
    validateWatchlistItem() {
        let wli = this.editedItem;
        let result = { status: "success", msg: "success" };

        // validate instrument
        if (wli.instrument.length < 1 || wli.instrument.length > 10) {
            result.status = "error";
            result.msg = "Stock code should be between 3 to 10 characters";
            return result;
        }
        // check duplicates
        if (this.isAdding && this.watchlist.instruments.findIndex(w => 
                                    (w.instrument === wli.instrument) && (w.exchange === wli.exchange)) !== -1) {
            result.status = "error";
            result.msg = "'" + wli.instrument + ' / ' + wli.exchange + "' already exists in this watchlist";
            return result;
        }
        // validate quantity
        if (isNaN(wli.unitsOwned)) {
            result.status = "error";
            result.msg = "'Units owned' should be a number";
            return result;
        }
        if (wli.unitsOwned < 1 || wli.unitsOwned > 999999999) {
            result.status = "error";
            result.msg = "'Units owned' should be between 1 to 1 billion";
            return result;
        }
        // validate avg price
        if (isNaN(wli.avgPrice)) {
            result.status = "error";
            result.msg = "'Buy price' should be a number";
            return result;
        }
        if (wli.avgPrice <= 0 || wli.avgPrice >= 10000) {
            result.status = "error";
            result.msg = "'Buy price' should be more than 0 and less than 10000";
            return result;
        }
        // validate ticker code 
        if (this.tickers.filter(t => t.Symbol === wli.instrument).length === 0) {
            result.status = "error";
            result.msg = "Invalid stock code";
            return result;
        }
        return result;
    }

    deleteWatchlistItem(stock: WatchlistItem) {
        if (confirm('Delete ' + stock.instrument + ' from watchlist?')) {
            this.isDeleting = true;
            this.msg = "Deleting...please wait.";
            this.msgClass = this.msgClasses.info;

            this.watchlistService
                .deleteWatchlistItem(this.watchlist, stock)
                .then(res => {
                    this.resetView();
                });
        }
    }

    resetView() {
        this.editedItem = null;
        this.selectStkCode = null;
        this.selectStkName = null;
        this.isEditing = false;
        this.isAdding = false;
        this.isDeleting = false;
        this.msg = "";
        this.msgClass = "";
    }

}
