import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../currency.service';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-price-chart',
  templateUrl: './price-chart.component.html',
  styleUrls: ['./price-chart.component.css']
})
export class PriceChartComponent implements OnInit {

  constructor(public currencyService: CurrencyService) { }

  public allCurrency = [];
  public chart = [];
  public listArr = [];

  public new_price = [];


  ngOnInit() {
    this.currencyService.getAllCurrency().subscribe(

      data => {
        this.allCurrency = data.data;
        for (let element in this.allCurrency) {
          this.listArr.push(this.allCurrency[element]);

        }
        

        // console.log(this.new_price);

        let price = this.listArr.map(res => res.quotes.USD.price);
        for (let x of price) {
          var value = x
          console.log(value)
        }

        let percent_change_24h = this.listArr.map(res => res.quotes.USD.percent_change_24h);

        var old_number
        
        for (let y of this.listArr) {
          if(y.quotes.USD.percent_change_24<=0){
             old_number = (y.quotes.USD.price - (y.quotes.USD.percent_change_24h / 100))

            // console.log(old_number)
          }
          else{
            var old_number = (y.quotes.USD.price + (y.quotes.USD.percent_change_24h / 100))
            // console.log(old_number)

          }
          this.new_price.push(old_number);

        }



          let alldates = this.listArr.map(res => res.last_updated)


          let weatherDates = []
          alldates.forEach((res) => {
            let jsdates = new Date(res * 1000)
            jsdates.setHours(-24);
            // console.log(jsdates)





            weatherDates.push(jsdates.toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric' }))

          })

          let new_arr = this.new_price //Old price
          console.log(new_arr)
          this.chart = new Chart('canvas', {
            type: 'line',

            data: {
              labels: weatherDates,
              datasets: [
                {
                  data: new_arr,
                  name: 'website_slug',
                  borderColor: "red",
                  fill: false,

                },
                {
                  data: price,
                  name: 'website_slug',
                  borderColor: "#3ccc9f",
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
