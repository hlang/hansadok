import {Component, OnInit} from '@angular/core';
import {TickerInfoResult, TickerService} from "../ticker.service";
import {SelectItem} from 'primeng/api';

@Component({
    selector: 'app-ticker',
    templateUrl: './ticker.component.html',
    styleUrls: ['./ticker.component.css']
})
export class TickerComponent implements OnInit {

    pairs: SelectItem[] = [
        {label: 'ETHEUR', value: 'ETHEUR'},
        {label: 'XBTEUR', value: 'XBTEUR'}
    ];
    selectedPairs: string[] =
                ['XBTEUR', 'ETHEUR'];
    tickerResult: TickerInfoResult;

    constructor(private tickerService: TickerService) {
    }

    ngOnInit() {
        this.getTickerInfo(0);
    }

    private getTickerInfo(pageNum: number) {
        this.tickerService.getFilteredTickers(pageNum, this.selectedPairs)
            .subscribe(result => this.tickerResult = result);

    }

    private getPairs() {

        this.tickerService.getTickerPairs()
            .subscribe(pairs => {
                let pairsRead: SelectItem[];
                pairs.forEach(pair=> {
                    pairsRead.push({ label: pair, value: pair })
                });
                this.pairs = pairsRead;
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
}
