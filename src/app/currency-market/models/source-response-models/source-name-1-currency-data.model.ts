export interface ISourceName1CurrencyData {
  Date: string;
  PreviousDate: string;
  PreviousUrl: string;
  Timestamp: string;
  Valute: { [key: string]: ISourceName1CurrencyItem };
}

export interface ISourceName1CurrencyItem {
  ID: string;
  NumCode: string;
  CharCode: string;
  Nominal: number;
  Name: string;
  Value: number;
  Previous: number;
}
