import {Component, OnInit} from '@angular/core';
import {TickerService} from "../ticker.service";
import {TselectService} from "../tselect.service";
import {SelectItem} from "primeng/api";

@Component({
    selector: 'app-tselect',
    templateUrl: './tselect.component.html',
    styleUrls: ['./tselect.component.css']
})
export class TselectComponent implements OnInit {
    pairs: SelectItem[] = [];
    selectedPairs: string[] = [];

    constructor(private tickerService: TickerService,
                private selectService: TselectService) {
    }

    ngOnInit() {
        this.getPairs()
    }

    private getPairs() {

        this.tickerService.getTickerPairs()
            .subscribe(pairs => {
                this.processPairs(pairs);
                this.updateSelectedPairs();
            });
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

    private updateSelectedPairs() {
        this.selectService.updateSelectedPairs(this.selectedPairs);
    }

    tickerPairsChanged(event) {
        this.updateSelectedPairs();
    }

}
