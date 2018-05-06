import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";

export interface TickerInfo {

    pairName: string;
    averageToday: string;
    average24h: string;
    timestamp: string;
}

export interface TickerInfoResult {
    tickerInfos?: Array<TickerInfo>;
    size?: number;
    totalElements: number;
    totalPages?: number;
    pageNumber?: number
}


@Injectable()
export class TickerService {

    constructor(private http: HttpClient) {
    }


    getTickerInfos(pageNum: number): Observable<TickerInfoResult> {
        let params = new HttpParams()
            .set('sort', 'timestamp,DESC')
            .set('page', String(pageNum));

        return this.http.get("tickers", {
            params: params
        }).map(res => TickerService.extractData(res));

    }

    getFilteredTickers(pageNum: number, pairNames: string[]): Observable<TickerInfoResult> {
        let params = new HttpParams()
            .set('sort', 'timestamp,DESC')
            .set('pairNames', pairNames.join(','))
            .set('page', String(pageNum));

        return this.http.get("tickers/search/findByPairNameIn", {
            params: params
        }).map(res => TickerService.extractData(res));
    }

    getTickerPairs() : Observable<string[]> {
        return this.http.get("tickerctrl/pairs")
            .map(res => <string[]>res);
    }

    private static extractData(response: Object): TickerInfoResult {
        let searchResult: TickerInfoResult;
        if (response['_embedded']) {
            searchResult = {
                tickerInfos: response['_embedded'].tickers,
                totalElements: response['page'].totalElements,
                size: response['page'].size,
                totalPages: response['page'].totalPages,
                pageNumber: response['page'].number
            }
        } else {
            searchResult = {
                totalElements: 0
            }
        }

        return searchResult;
    }
}
