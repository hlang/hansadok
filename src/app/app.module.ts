import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {TabViewModule} from 'primeng/tabview';
import {TableModule} from 'primeng/table';
import {PaginatorModule} from 'primeng/paginator';
import {MultiSelectModule} from 'primeng/multiselect';
import {ChartModule} from 'primeng/chart';

import {AppComponent} from './app.component';
import {TickerService} from "./ticker.service";
import {TickerComponent} from './ticker/ticker.component';
import {TchartComponent} from './tchart/tchart.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


@NgModule({
    declarations: [
        AppComponent,
        TickerComponent,
        TchartComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        TabViewModule,
        TableModule,
        PaginatorModule,
        MultiSelectModule,
        ChartModule
    ],
    providers: [
        TickerService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
