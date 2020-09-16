export interface ISourceName2CurrencyData {
  ValCurs: {
    $: { Date: string; name: string; };
    Valute: ISourceName2CurrencyItem[];
  };
}

export interface ISourceName2CurrencyItem {
  $: { ID: string };
  CharCode: string[];
  Name: string[];
  Nominal: string[];
  NumCode: string[];
  Value: string[];
}
