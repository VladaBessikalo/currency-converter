import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private apiUrl = 'https://v6.exchangerate-api.com/v6/97da04be80dfd338c9707a47/latest/UAH';
  private commonApi = 'https://v6.exchangerate-api.com/v6/97da04be80dfd338c9707a47/latest/';


  constructor(private http: HttpClient) { }

  getExchangeRates(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getExchangeRate(baseCurrency: string): Observable<any> {
    const api = `${this.commonApi}${baseCurrency}`;
    return this.http.get(api);
  }

}
