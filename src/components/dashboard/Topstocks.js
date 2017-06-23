import { Component, OnChanges, Input } from '@angular/core';
import { WatchlistItem, FilterArrPipe } from '../common';

@Component({
    selector: 'fp-topstocks',
    templateUrl: './topstocks.component.html',
    styles: [`  
                .stkTable thead {
                    background: #ecf0f1;
                }                              
                .stkTable {
                    background: white
                }                
        `]
})

export class TopstocksComponent implements OnChanges {

    @Input('stocks') allStocks: Map<string, WatchlistItem[]>;
    @Input() title;
    @Input() orderBy;
    @Input() numItems;
    @Input() sliceMode;

    filteredStocks: Object[] = [];

    constructor(private filterListPipe: FilterArrPipe) { } 

    ngOnChanges() {
        this.filteredStocks = this.filterListPipe.transform(this.getFlatList(), this.orderBy, this.numItems, this.sliceMode);
        
        if (this.sliceMode === 'bottom') {
            this.filteredStocks.reverse();
        }
    }

    getFlatList(): Object[] {
        // aggregate the values for the same stock and create a flat list
        let flatList = [];
        this.allStocks.forEach((stocks, key) => {
            let [instrument, exchange] = key.split(':');
            let value = 0;
            stocks.forEach(stock => value += stock[this.orderBy]);
            flatList.push({ instrument, exchange, [this.orderBy]: value });
        });
        return flatList;
    }

    render() {
      <div class="table-responsive">
	<table class="table table-bordered stkTable" *ngIf="filteredStocks?.length > 0">
		<thead>
			<tr>
				<th>Stock Code </th>
				<th>Exchange </th>
				<th class="number-field">{{ title }} </th>
			</tr>
		</thead>
		<!--Display the stocks in the watchlist-->
		<tbody>
			<tr *ngFor="let stock of filteredStocks">
				<td> {{ stock.instrument }} </td>
				<td> {{ stock.exchange }} </td>
				<td class="number-field" sign> {{ stock[orderBy] | number:'1.2-2' }} </td>
			</tr>
		</tbody>
	</table>
</div>
    }
}
