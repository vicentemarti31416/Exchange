import { Rate } from './shared/model/rate';
import { ExchangeService } from './shared/service/exchange.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Exchange';
  ratesObject: any;
  ratesArray: Rate[] = [];
  input: number = 1;
  base;

  constructor(
    private exchangeService: ExchangeService
  ) {}

  ngOnInit(): void {
    this.exchangeService.findAll().subscribe((response) => {
      this.base = response.base;
      this.ratesObject = response.rates;
      this.populateArray();
    })
  }

  public changeRate(rate: Rate): void {
    this.base = rate.key;
    this.exchangeService.findByRate(rate).subscribe((reponse) => {
      this.ratesObject = reponse.rates;
      this.populateArray();
    })
  }

  public populateArray(): void {
    this.ratesArray = [];
    for (let key in this.ratesObject) {
      let rate = new Rate(key, this.ratesObject[key])
      this.ratesArray.push(rate);
    }
  }

  public changeValue(money): void {
    this.ratesArray.forEach((rate) => {
      if (rate.key == this.base) {
        rate.value = parseInt(money);
      } else {
        rate.value = rate.value * parseInt(money);
      }
    })
  }

}
