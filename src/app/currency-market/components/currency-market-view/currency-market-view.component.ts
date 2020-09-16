import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { CurrencyMarketService } from 'app/currency-market/services/currency-market.service';

import { ICurrencyItem } from 'app/currency-market/models/currency-item.model';
import { ISelectOption } from '@shared/interfaces/select-option.interface';

import { CurrencyCharCode } from 'app/currency-market/enums/currency-char-code.enum';


@Component({
  selector: 'app-currency-market-view',
  templateUrl: './currency-market-view.component.html',
  styleUrls: ['./currency-market-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrencyMarketViewComponent implements OnInit {
  currencyItems$: Observable<ICurrencyItem[]>;

  filterValues: CurrencyCharCode[] = [];
  selectOptions: ISelectOption[] = [];

  constructor(private currencyMarketService: CurrencyMarketService) {
  }

  ngOnInit(): void {
    this.currencyItems$ = this.currencyMarketService.currencyItems$;
    this.selectOptions = Object.values(CurrencyCharCode).map((charCode: CurrencyCharCode) => {
      const selectOption: ISelectOption = { id: charCode, name: charCode };
      return selectOption;
    });
  }

  trackByFn(index: number, item: ICurrencyItem): ICurrencyItem {
    return item;
  }

  addFilterItem(option: ISelectOption): void {
    const charCode: CurrencyCharCode = option.id as CurrencyCharCode;
    this.filterValues = [ ...this.filterValues, charCode ];
  }

  removeFilterItem(option: ISelectOption): void {
    const charCode: CurrencyCharCode = option.id as CurrencyCharCode;
    this.filterValues = this.filterValues.filter((cCode: CurrencyCharCode) => cCode !== charCode);
  }

  clearFilter(): void {
    this.filterValues = [];
  }
}
