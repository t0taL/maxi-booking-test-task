import { CurrencyCharCode } from '../enums/currency-char-code.enum';


export interface ICurrencyItem {
  ID: string;
  NumCode: string;
  CharCode: CurrencyCharCode;
  Nominal: string;
  Name: string;
  Value: string;
}
