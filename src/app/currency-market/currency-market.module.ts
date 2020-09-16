import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurrencyMarketRoutingModule } from './currency-market-routing.module';
import { ApiModule } from '../api/api.module';
import { SharedModule } from '@shared/shared.module';

import { CurrencyMarketService } from './services/currency-market.service';
import { ServerResponseAdapter } from './utils/server-response.adapter';

import { CurrencyFilterPipe } from './pipes/currency-filter.pipe';

import { CurrencyMarketViewComponent } from './components/currency-market-view/currency-market-view.component';
import { CurrencyItemComponent } from './components/currency-market-view/currency-item/currency-item.component';
import { SettingsModalComponent } from './components/settings-modal/settings-modal.component';
import { SettingsItemComponent } from './components/settings-modal/settings-item/settings-item.component';


@NgModule({
  declarations: [
    CurrencyFilterPipe,
    CurrencyMarketViewComponent,
    CurrencyItemComponent,
    SettingsModalComponent,
    SettingsItemComponent
  ],
  imports: [
    CommonModule,
    CurrencyMarketRoutingModule,
    ApiModule,
    SharedModule
  ],
  providers: [
    CurrencyMarketService,
    ServerResponseAdapter
  ]
})
export class CurrencyMarketModule {
}
