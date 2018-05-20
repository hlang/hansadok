import {Component, OnDestroy, OnInit} from '@angular/core';
import {TickerInfoResult, TickerService} from "../ticker.service";
import {DatePipe} from "@angular/common";
import {TselectService} from "../tselect.service";
import {Subscription} from "rxjs/Subscription";

@Component({
    selector: 'app-tchart',
    templateUrl: './tchart.component.html',
    styleUrls: ['./tchart.component.css']
})
export class TchartComponent implements OnInit, OnDestroy {
    data: any;
    options: any;
    datePipe = new DatePipe('en');
    subscription: Subscription;
    borderColors = [
        '#4bc0c0',
        '#565656',
        '#7CB342',
        "#FF6384",
        "#36A2EB",
        "#FFCE56"];
    borderColorIndex = 0;

    constructor(private tickerService: TickerService,
                private selectService: TselectService) {
        this.data = {};

        this.options = {
            legend: {
                position: 'top'
            }
        };
    }

    ngOnInit() {
        this.subscription = this.selectService.selectedPairs$.subscribe(
            pairs => {
                this.getTickerData(pairs)
            }
        )
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    private getTickerData(pairs: string[]) {
        this.tickerService.getFilteredTickers(0, pairs)
            .subscribe(result => this.processResult(result, pairs));

    }

    private processResult(result: TickerInfoResult, pairs: string[]) {
        let datasets: any[] = [];

        pairs.forEach(
            tickerName =>
                datasets.push(this.getDataSet(result, tickerName))
        );
        this.data = {
            labels: this.getLabels(result, pairs[0]),
            datasets: datasets
        }
    }

    private getLabels(result: TickerInfoResult, tickerName: string): string[] {
        let labels: string[] = [];
        result.tickerInfos.forEach(
            tinfo => {
                if (tinfo.pairName == tickerName) {
                    labels.push(this.datePipe.transform(tinfo.timestamp, 'dd.MM.y HH:mm:ss'));
                }
            }
        );
        return labels.reverse();
    }

    private getDataSet(result: TickerInfoResult, tickerName: string): any {
        let data: number[] = [];

        result.tickerInfos.forEach(
            tinfo => {
                if (tinfo.pairName == tickerName) {
                    data.push(Number(tinfo.average24h))
                }
            }
        );

        return {
            label: tickerName,
            fill: false,
            borderColor: this.getNextBorderColor(),
            data: data.reverse()
        }
    }

    private getNextBorderColor(): string {
        this.borderColorIndex += 1;
        if (this.borderColorIndex >= this.borderColors.length) {
            this.borderColorIndex = 0;
        }

        return this.borderColors[this.borderColorIndex];
    }
}

