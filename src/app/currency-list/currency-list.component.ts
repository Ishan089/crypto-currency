import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../currency.service';
import { ActivatedRoute, Router } from '@angular/router';
import 'hammerjs';


@Component({
  selector: 'app-currency-list',
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.css']
})

export class CurrencyListComponent implements OnInit {


  public key:string;
  public displaycheckbox: boolean = false;
  public reverse: boolean=false;
  public allCurrency = [];
  public listArr = [];
  public arrCopy = [];
  public result = []; //for slider
  public Length: any;
  public selected: any;
  selectedIndex: number = null;
  public favData = [];
  public favouriteCoin = [];
  public selectedCoin = [];
  public comparsionId = [];
  

  constructor(private _route: ActivatedRoute, private router: Router, public listService: CurrencyService) { }

  ngOnInit() {
   
      this.listService.getAllCurrency().subscribe(
        data => {
          this.allCurrency = data.data;
          // console.log(this.allCurrency)
          for (let element in this.allCurrency) {
            this.listArr.push(this.allCurrency[element]);
              // console.log(this.listArr)
            
          }
          this.arrCopy = this.listArr;
          // console.log(this.arrCopy)
         
        },
        error => {
          console.log(error);
        }
      )
    }

   
  
    public sort(key)  {
      if(this.key== key)
        console.log(this.key);
      this.reverse = !this.reverse;


    }
    p: number = 1;

  
  // for range slider function
  
    public myOnFinish(event1, type) {
      
      

      let minimum = event1.from;
      // console.log(min)

      let maximum = event1.to;
      // console.log(max)
      if (type == 'market_cap') {
        console.log(type)

        if (this.result.length > 0) {

          
          this.result = this.result.filter(word => (word.quotes.USD.market_cap > minimum && word.quotes.USD.market_cap < maximum));
      } 
      else {
          this.result = this.arrCopy.filter(word => (word.quotes.USD.market_cap > minimum && word.quotes.USD.market_cap < maximum));
          console.log(this.result)
        }
      } else {
        if (this.result.length > 0) {
          this.result = this.result.filter(word => (word.quotes.USD.price > minimum && word.quotes.USD.price < maximum));
        } else {
          this.result = this.arrCopy.filter(word => (word.quotes.USD.price > minimum && word.quotes.USD.price < maximum));
        }
      }
      this.listArr = this.result;
    }
  // fav selected coin in local storage
    onSelect(j) {
    
      
      this.favData.push(j);
      console.log(this.favData)
      localStorage.setItem("someId", JSON.stringify(this.favData));
      if(this.selected!==j){
        this.selected=j
      }
      else{
        this.selected=null
      }
      
      // this.selected = this.selected == j ? null : j;
      console.log(this.selected)
  
    }
    isActive(k) {
      return this.selected === k;
    };
    
    // function for select coin by checkbox 
    onChange(id, isChecked)
    {
      if (isChecked) {
        this.comparsionId.push(id);
      } else{
        this.comparsionId.splice(0,this.comparsionId.length);
      
        if (isChecked) {
          this.comparsionId.push(id);
      }
    }
  }
  
  public checkboxdisplay() {
    this.displaycheckbox = !this.displaycheckbox;
    
  }
    
  // navigate comparison chart component 
    OnSelectCurrency() 
    {
      if(this.comparsionId.length >2)
      {
       alert("Please select only two currency");
       location.reload(true);
  
      }
      else{
        console.log(this.comparsionId);
        this.router.navigate(['/comparisonView',this.comparsionId[0],this.comparsionId[1]]);
  
      }
      
    }
  
    //navigate to price chart
    public gopricechart(v) {
      this.router.navigate(['/priceChart'],{ queryParams: {pc:v} });
  }
  }


