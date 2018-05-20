import {Injectable} from '@angular/core';
import {Subject} from "rxjs/Subject";

@Injectable()
export class TselectService {
    // Observable string sources
    private selectedPairsSource = new Subject<string[]>();
    public selectedPairs$ = this.selectedPairsSource.asObservable();

    constructor() {
    }

    public updateSelectedPairs(pairs: string[]) {
        this.selectedPairsSource.next(pairs);
    }

}
