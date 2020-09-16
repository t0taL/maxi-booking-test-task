import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CurrencyMarketViewComponent } from './components/currency-market-view/currency-market-view.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: CurrencyMarketViewComponent }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class CurrencyMarketRoutingModule {
}
