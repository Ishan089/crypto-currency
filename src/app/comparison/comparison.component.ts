import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyService } from '../currency.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.css']
})
export class ComparisonComponent implements OnInit {

  public selectedCoin1 = [];
  public selectedCoin2 = [];
  public allCurrency = [];
  public arr = [];
  public arrCopy = [];
  public chart1 = [];
  public timelines1 = [];
  public timelines2 = [];
  date_1 = [];
  date_2 = [];
  public TIME_INTERVAL = 1000;
  public TIMELINE_LENGTH = 12;
  public PriceData1 = [];
  public PriceData2 = [];
  public key = 'id';
  public real_price = []
  public real_price2 = []

  public pricee = []
  public priceee = []

  constructor(private _route: ActivatedRoute, private router: Router, public listService: CurrencyService) { }

  ngOnInit() {

    let myCoinId1 = this._route.snapshot.paramMap.get('symbol1');
    // console.log(myCoinId1)
    let myCoinId2 = this._route.snapshot.paramMap.get('symbol2');
    // console.log(myCoinId2)

    // get data against last updated time for both currency
    this.listService.getAllCurrency().subscribe(
      data => {
        this.allCurrency = data.data;

        for (let element in this.allCurrency) {
          this.arr.push(this.allCurrency[element]);
        }
        this.arrCopy = this.arr;

        this.selectedCoin1 = this.arrCopy.filter(word => word.id == myCoinId1);
        // console.log(this.selectedCoin1)
        this.selectedCoin2 = this.arrCopy.filter(word => word.id == myCoinId2);

        let date1 = new Date(this.selectedCoin1[0].last_updated);
        // console.log(date1)
        let date2 = new Date(this.selectedCoin2[0].last_updated * 1000);
        // console.log(date2)


        //  let update = date1.toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric' }))


        // let hours1 = date1.setHours(-24);
        // // console.log(hours1)

        // let hours2 = date2.setHours(-24);

        let price1 = this.selectedCoin1[0].quotes.USD.price;
        // console.log(price1)
        this.pricee.push(price1)
        var current_price1 = this.pricee
        console.log(current_price1)


        let price2 = this.selectedCoin2[0].quotes.USD.price;
        // console.log(price2)
         this.real_price.push(price2)
        var current_price2 = this.real_price
        console.log(current_price2)



        let priceChange1 = this.selectedCoin1[0].quotes.USD.percent_change_24h;
        // console.log(priceChange1)

        var oldprice

        if (priceChange1 > 0) {
          oldprice = (price1 - (price1 * (priceChange1 / 100)))
          // console.log(oldprice)
        }
        else {
          oldprice = price1 + (price1 * (priceChange1 / 100));
        }
        this.real_price.push(oldprice)
        // console.log(this.real_price.push(oldprice))
        var old_price1 = this.real_price;
        console.log(old_price1)



        let priceChange2 = this.selectedCoin2[0].quotes.USD.percent_change_24h;

        let oldvalue2
        if (priceChange2 > 0) {
          oldvalue2 = (price2 - (price2 * (priceChange2 / 100)))
          // console.log(oldvalue2)
        }
        else {
          oldvalue2 = price2 + (price2 * (priceChange2 / 100));
        }

        this.real_price2.push(oldvalue2)
        var old_price2 = this.real_price2;
        console.log(old_price2)


        this.chart1 = new Chart('canvas', {
          type: 'line',

          data: {

            datasets: [

              {
                data: current_price1,
                borderColor: "red",
                fill: false,

              },
              
              {
                data: old_price1,
                borderColor: "blue",
                fill: false,

              },
              {
                data: current_price2,
                borderColor: "magenta",
                fill: false,

              },
              {
                data: old_price2,
                borderColor: "black",
                fill: false,

              },


            ]
          },
          options: {
            legend: {
              display: true
            },
            scales: {
              xAxes: [{
                display: true,
                text: "price"
              }],
              yAxes: [{
                display: true,
                text: "coin"
              }],
            }
          }
        });
      },
      error => {

        console.log(error);
      }

    )
  }

}




// chart for both static data static

