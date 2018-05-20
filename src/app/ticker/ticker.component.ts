import {Component, OnInit} from '@angular/core';
import {TickerInfoResult, TickerService} from "../ticker.service";
import {SelectItem} from 'primeng/api';

@Component({
    selector: 'app-ticker',
    templateUrl: './ticker.component.html',
    styleUrls: ['./ticker.component.css']
})
export class TickerComponent implements OnInit {

    pairs: SelectItem[] = [];
    selectedPairs: string[] = [];
    tickerResult: TickerInfoResult = {
        totalElements: 0
    };

    constructor(private tickerService: TickerService) {
    }

    ngOnInit() {
        this.getPairs();
    }

    private getTickerInfo(pageNum: number) {
        this.tickerService.getFilteredTickers(pageNum, this.selectedPairs)
            .subscribe(result => this.tickerResult = result);

    }

    private getPairs() {

        this.tickerService.getTickerPairs()
            .subscribe(pairs => {
                this.processPairs(pairs);
                this.getTickerInfo(0);
            });
    }

    paginate(event) {
        //event.first = Index of the first record
        //event.rows = Number of rows to display in new page
        //event.page = Index of the new page
        //event.pageCount = Total number of pages
        this.getTickerInfo(event.page);
    }

    tickerPairsChanged(event) {
        this.getTickerInfo(0);
    }

    private processPairs(tickerPairs: string[]) {
        let pairsRead: SelectItem[] = [];
        let selPairs: string[] = [];
        tickerPairs.forEach(pair => {
            pairsRead.push({label: pair, value: pair});
            selPairs.push(pair)
        });
        this.pairs = pairsRead;
        this.selectedPairs = selPairs;
    }
}
