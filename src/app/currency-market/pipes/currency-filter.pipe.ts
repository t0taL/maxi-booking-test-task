import { Pipe, PipeTransform } from '@angular/core';

import { ICurrencyItem } from '../models/currency-item.model';

import { CurrencyCharCode } from '../enums/currency-char-code.enum';


@Pipe({ name: 'currencyFilter' })
export class CurrencyFilterPipe implements PipeTransform {
  transform(currencyItems: ICurrencyItem[], charCodes: CurrencyCharCode[]): ICurrencyItem[] {
    if (charCodes.length && currencyItems) {
      return currencyItems.filter((currencyItem: ICurrencyItem) => charCodes.includes(currencyItem.CharCode));
    } else {
      return currencyItems;
    }
  }
}
