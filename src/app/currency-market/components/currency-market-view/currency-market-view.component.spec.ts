import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyMarketViewComponent } from './currency-market-view.component';

describe('CurrencyMarketViewComponent', () => {
  let component: CurrencyMarketViewComponent;
  let fixture: ComponentFixture<CurrencyMarketViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrencyMarketViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyMarketViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
