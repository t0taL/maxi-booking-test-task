import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';

import { HeaderComponent } from './components/header/header.component';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { SelectComponent } from './components/select/select.component';
import { ButtonComponent } from './components/button/button.component';
import { IconButtonComponent } from './components/icon-button/icon-button.component';
import { LoaderComponent } from './components/loader/loader.component';


@NgModule({
  declarations: [
    HeaderComponent,
    NavComponent,
    HomeComponent,
    SelectComponent,
    ButtonComponent,
    IconButtonComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgSelectModule
  ],
  exports: [
    HeaderComponent,
    NavComponent,
    HomeComponent,
    SelectComponent,
    ButtonComponent,
    IconButtonComponent,
    LoaderComponent
  ]
})
export class SharedModule {
}
