import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { ICurrencyItem } from 'app/currency-market/models/currency-item.model';


@Component({
  selector: 'app-currency-item',
  templateUrl: './currency-item.component.html',
  styleUrls: ['./currency-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrencyItemComponent implements OnInit {
  @Input() item: ICurrencyItem;

  constructor() {
  }

  ngOnInit(): void {
  }
}
