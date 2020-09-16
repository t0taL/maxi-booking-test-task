import { Injectable } from '@angular/core';
import xml2js from 'xml2js';

import { ICurrencyItem } from '../models/currency-item.model';
import { ISourceName1CurrencyData, ISourceName1CurrencyItem } from '../models/source-response-models/source-name-1-currency-data.model';
import { ISourceName2CurrencyData, ISourceName2CurrencyItem } from '../models/source-response-models/source-name-2-currency-data';

import { CurrencyCharCode } from '../enums/currency-char-code.enum';


@Injectable()
export class ServerResponseAdapter {
  adaptFromSourceName1(response: ISourceName1CurrencyData): ICurrencyItem[] {
    const currencyItems: ICurrencyItem[] = Object.values(response.Valute)
      .map((sourceName1CurrencyItem: ISourceName1CurrencyItem) => {
        const currencyItem: ICurrencyItem = {
          ID: sourceName1CurrencyItem.ID,
          NumCode: sourceName1CurrencyItem.NumCode,
          CharCode: sourceName1CurrencyItem.CharCode as CurrencyCharCode,
          Nominal: sourceName1CurrencyItem.Nominal.toString(),
          Name: sourceName1CurrencyItem.Name,
          Value: sourceName1CurrencyItem.Value.toString()
        };

        return currencyItem;
      });
    return currencyItems;
  }

  adaptFromSourceName2(response: string): ICurrencyItem[] {
    let currencyItems: ICurrencyItem[];
    const parser = new xml2js.Parser({ trim: true, explicitArray: true });

    parser.parseString(response, (err: any, result: ISourceName2CurrencyData) => {
      const responseCurrencyItems: ISourceName2CurrencyItem[] = result.ValCurs.Valute;
      currencyItems = responseCurrencyItems.map((responseCurrencyItem: ISourceName2CurrencyItem) => {
        const adaptedCurrencyItem: ICurrencyItem = {
          ID: responseCurrencyItem.$.ID,
          NumCode: responseCurrencyItem.NumCode[0],
          CharCode: responseCurrencyItem.CharCode[0] as CurrencyCharCode,
          Nominal: responseCurrencyItem.Nominal[0],
          Name: responseCurrencyItem.Name[0],
          Value: responseCurrencyItem.Value[0]
        };

        return adaptedCurrencyItem;
      });
    });

    return currencyItems;
  }
}
