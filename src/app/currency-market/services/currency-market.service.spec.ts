import { TestBed } from '@angular/core/testing';

import { CurrencyMarketService } from './currency-market.service';

describe('CurrencyMarketService', () => {
  let service: CurrencyMarketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrencyMarketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
