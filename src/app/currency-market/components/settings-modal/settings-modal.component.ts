import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { settingsModalAnimation } from 'app/currency-market/animations/settings-modal.animation';

import { CurrencyMarketService } from 'app/currency-market/services/currency-market.service';

import { ISourceItem } from 'app/currency-market/interfaces/source-item.interface';

import { SourceOrderActions } from 'app/currency-market/enums/source-order-actions.enum';


@Component({
  selector: 'app-settings-modal',
  templateUrl: './settings-modal.component.html',
  styleUrls: ['./settings-modal.component.scss'],
  animations: [ settingsModalAnimation ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsModalComponent implements OnInit {
  sourceList$: Observable<ISourceItem[]>;
  unavailableSourceCheckingState$: Observable<boolean>;

  modalIsOpened: boolean = false;

  constructor(private currencyMarketService: CurrencyMarketService) {
  }

  ngOnInit(): void {
    this.sourceList$ = this.currencyMarketService.sourceItemsList$;
    this.unavailableSourceCheckingState$ = this.currencyMarketService.unavailableSourceCheckingState$;
  }

  trackByFn(index: number, item: ISourceItem): ISourceItem {
    return item;
  }

  toggleModal(): void {
    this.modalIsOpened = !this.modalIsOpened;
  }

  setUnavailableSourceCheckingState(state: boolean): void {
    this.currencyMarketService.setUnavailableSourceCheckingState(state);
  }

  moveItemUp(itemIndex: number): void {
    this.currencyMarketService.changeSourcesOrder(itemIndex, SourceOrderActions.UP);
  }

  moveItemDown(itemIndex: number): void {
    this.currencyMarketService.changeSourcesOrder(itemIndex, SourceOrderActions.DOWN);
  }
}
