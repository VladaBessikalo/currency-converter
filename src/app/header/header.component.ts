import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../currency.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  usdToUah: number;
  eurToUah: number; 
  plnToUah: number;

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.currencyService.getExchangeRates().subscribe((data: any) => {
      const exchangeRates = data.conversion_rates;
      this.usdToUah = exchangeRates.USD;
      this.eurToUah = exchangeRates.EUR;
      this.plnToUah = exchangeRates.PLN;
    })
  }
}
