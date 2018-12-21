import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule } from '@angular/common/http';
import {FormsModule } from '@angular/forms';
import {CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { CurrencyListComponent } from './currency-list/currency-list.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { PriceChartComponent } from './price-chart/price-chart.component';
import { ComparisonComponent } from './comparison/comparison.component';

import { CurrencyService } from './currency.service';

import { IonRangeSliderModule } from "ng2-ion-range-slider";
import { DataTablesModule } from 'angular-datatables';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';

import { AngularFontAwesomeModule } from 'angular-font-awesome';


import { RouterModule} from '@angular/router';
import 'hammerjs';


@NgModule({
  declarations: [
    AppComponent,
    CurrencyListComponent,
    FavouritesComponent,
    PriceChartComponent,
    ComparisonComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    IonRangeSliderModule,
    DataTablesModule,
    NgxPaginationModule,
    OrderModule,
    AngularFontAwesomeModule,
    RouterModule.forRoot([
      {path:'listView', component: CurrencyListComponent},
      {path:'', redirectTo:'listView',pathMatch:'full'},
      {path :'priceChart', component: PriceChartComponent},
      {path :'comparisonView/:symbol1/:symbol2', component: ComparisonComponent},
      {path :'favourites', component: FavouritesComponent}

    ])
    
  ],
  providers: [CurrencyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
