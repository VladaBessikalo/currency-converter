import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CurrencyService } from '../currency.service';
import { debounceTime } from 'rxjs';



interface Response {
  result: string,
  documentation: string,
  terms_of_use: string,
  time_last_update_unix: number,
  time_last_update_utc: string,
  time_next_update_unix: number,
  time_next_update_utc: string,
  base_code: string,
  conversion_rates: Record<string, number>
}

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrl: './converter.component.scss'
})
export class ConverterComponent implements OnInit{
  converterForm: FormGroup; 

  constructor(
    private currencyService: CurrencyService,
  ) {}

  ngOnInit(): void {
    this.converterForm = new FormGroup({
      value1: new FormControl(0, Validators.required),
      currency1: new FormControl('UAH', Validators.required),
      value2: new FormControl({value: 0, disabled: true}, Validators.required),
      currency2: new FormControl('USD', Validators.required)
    });

    this.converterForm.valueChanges
      .pipe(
        debounceTime(300)
      )
      .subscribe(() => {
        this.convert();
      });
  }

  switchCurrencies() {
    const tempValue1 = this.converterForm.get('value1')?.value;
    const tempCurrency1 = this.converterForm.get('currency1')?.value;
    const tempValue2 = this.converterForm.get('value2')?.value;
    const tempCurrency2 = this.converterForm.get('currency2')?.value;
    
    this.converterForm.get('value1')?.setValue(tempValue2);
    this.converterForm.get('currency1')?.setValue(tempCurrency2);

    this.converterForm.get('value2')?.setValue(tempValue1);
    this.converterForm.get('currency2')?.setValue(tempCurrency1);
  }

  convert() {
    const baseCurrency = this.converterForm.get('currency1')?.value;

    this.currencyService.getExchangeRate(baseCurrency).subscribe((response: Response) => {
      const exchangeRate = response.conversion_rates[this.converterForm.get('currency2')?.value];
      const result = this.converterForm.get('value1')?.value * exchangeRate;
      this.converterForm.get('value2')?.patchValue(
        result,
        { emitEvent: false }
      );
    })
  }
}
