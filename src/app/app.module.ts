import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {TabViewModule} from 'primeng/tabview';
import {TableModule} from 'primeng/table';
import {PaginatorModule} from 'primeng/paginator';
import {MultiSelectModule} from 'primeng/multiselect';

import {AppComponent} from './app.component';
import {TickerService} from "./ticker.service";
import {TickerComponent} from './ticker/ticker.component';


@NgModule({
    declarations: [
        AppComponent,
        TickerComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        TabViewModule,
        TableModule,
        PaginatorModule,
        MultiSelectModule
    ],
    providers: [
        TickerService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
