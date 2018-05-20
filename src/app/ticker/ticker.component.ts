import {Component, OnDestroy, OnInit} from '@angular/core';
import {TickerInfoResult, TickerService} from "../ticker.service";
import {TselectService} from "../tselect.service";
import {Subscription} from "rxjs/Subscription";

@Component({
    selector: 'app-ticker',
    templateUrl: './ticker.component.html',
    styleUrls: ['./ticker.component.css']
})
export class TickerComponent implements OnInit, OnDestroy {

    selectedPairs: string[] = [];
    subscription: Subscription;
    tickerResult: TickerInfoResult = {
        totalElements: 0
    };

    constructor(private tickerService: TickerService,
                private selectService: TselectService) {
    }

    ngOnInit() {
        this.subscription = this.selectService.selectedPairs$.subscribe(
            pairs => {
                this.selectedPairs = pairs;
                this.getTickerInfo(0)
            }
        );

    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    private getTickerInfo(pageNum: number) {
        this.tickerService.getFilteredTickers(pageNum, this.selectedPairs)
            .subscribe(result => this.tickerResult = result);

    }

    paginate(event) {
        //event.first = Index of the first record
        //event.rows = Number of rows to display in new page
        //event.page = Index of the new page
        //event.pageCount = Total number of pages
        this.getTickerInfo(event.page);
    }
}
