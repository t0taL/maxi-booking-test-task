import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, timer } from 'rxjs';
import { catchError, map, mergeMap, takeUntil, withLatestFrom } from 'rxjs/operators';

import { ApiService } from '@api/services/api.service';
import { ServerResponseAdapter } from '../utils/server-response.adapter';

import { ICurrencyItem } from '../models/currency-item.model';
import { ISourceName1CurrencyData } from '../models/source-response-models/source-name-1-currency-data.model';
import { ISourceItem } from '../interfaces/source-item.interface';

import { SourceOrderActions } from '../enums/source-order-actions.enum';


const initialSourceItemsList: ISourceItem[] = [
  { name: 'Источник 1', trigger: 'sourceName1', inUse: true },
  { name: 'Источник 2', trigger: 'sourceName2', inUse: false }
];

@Injectable()
export class CurrencyMarketService {
  currencyItems$: Observable<ICurrencyItem[]>;

  currentSource$: BehaviorSubject<ISourceItem> = new BehaviorSubject<ISourceItem>(initialSourceItemsList[0]);
  sourceItemsList$: BehaviorSubject<ISourceItem[]> = new BehaviorSubject<ISourceItem[]>(initialSourceItemsList);
  unavailableSourceCheckingState$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private readonly stopStreamEvent: Subject<void> = new Subject<void>();

  constructor(private apiService: ApiService, private serverResponseAdapter: ServerResponseAdapter) {
    this.currencyItems$ = this.getStream();
  }

  // current source actions
  private setCurrentSourceItem(sourceItem: ISourceItem): void {
    return this.currentSource$.next(sourceItem);
  }

  // source items list actions
  private getSourceItemsList(): ISourceItem[] {
    return this.sourceItemsList$.getValue();
  }

  private updateSourceList(updatedSourceList: ISourceItem[]): void {
    this.sourceItemsList$.next(updatedSourceList);
  }

  changeSourcesOrder(itemIndex: number, direction: SourceOrderActions): void {
    const sourceItemsList: ISourceItem[] = this.getSourceItemsList();
    const targetSource: ISourceItem = sourceItemsList[itemIndex];

    switch (direction) {
      case SourceOrderActions.UP:
        sourceItemsList[itemIndex] = sourceItemsList[itemIndex - 1];
        sourceItemsList[itemIndex - 1] = targetSource;
        break;
      case SourceOrderActions.DOWN:
        sourceItemsList[itemIndex] = sourceItemsList[itemIndex + 1];
        sourceItemsList[itemIndex + 1] = targetSource;
        break;
    }

    this.setCurrentSourceItem(sourceItemsList[0]);
    this.updateSourceList(sourceItemsList);
  }

  // unavailable source checking state actions
  setUnavailableSourceCheckingState(state: boolean): void {
    this.unavailableSourceCheckingState$.next(state);
  }

  // stream
  private getStream(nextSourceDelay?: number): Observable<ICurrencyItem[] | any> {
    return timer(nextSourceDelay || 0, 10000)
      .pipe(
        takeUntil(this.stopStreamEvent),
        withLatestFrom(this.currentSource$, this.sourceItemsList$, this.unavailableSourceCheckingState$),
        mergeMap(([_, currentSource, sourceItemsList, unavailableSourceCheckingState]: [number, ISourceItem, ISourceItem[], boolean]) => {
          return this.execute(currentSource, sourceItemsList)
            .pipe(
              map((response: ICurrencyItem[]) => this.streamSuccessHandler(response, unavailableSourceCheckingState)),
              catchError((error) => this.streamFailHandler(currentSource, sourceItemsList))
            );
        })
      );
  }

  private execute(currentSourceItem: ISourceItem, sourceItemsList: ISourceItem[]): Observable<ICurrencyItem[]> {
    const updatedSourceList: ISourceItem[] = [];

    sourceItemsList.forEach((sourceItem: ISourceItem) => {
      sourceItem.inUse = (currentSourceItem.name === sourceItem.name);
      updatedSourceList.push(sourceItem);
    });
    this.updateSourceList(updatedSourceList);

    return this[currentSourceItem.trigger]();
  }

  // handlers
  private streamSuccessHandler(response: ICurrencyItem[], unavailableSourceCheckingState: boolean): ICurrencyItem[] {
    if (unavailableSourceCheckingState) {
      const sourceList: ISourceItem[] = this.getSourceItemsList();
      this.setCurrentSourceItem(sourceList[0]);
    }

    return response;
  }

  private streamFailHandler(currentSourceItem: ISourceItem, sourceItemsList: ISourceItem[]): Observable<ICurrencyItem[]> {
    this.stopStreamEvent.next();
    const currentSourceIdx: number = sourceItemsList.findIndex((sourceItem: ISourceItem) => sourceItem.name === currentSourceItem.name);
    const nextSourceIdx = currentSourceIdx + 1;

    if (sourceItemsList.length > nextSourceIdx) {
      this.setCurrentSourceItem(sourceItemsList[nextSourceIdx]);
    } else {
      this.setCurrentSourceItem(sourceItemsList[0]);
    }

    return this.getStream(3000);
  }

  // sources
  private sourceName1(): Observable<ICurrencyItem[]> {
    return this.apiService.get<ISourceName1CurrencyData>('daily_json.js')
      .pipe(map((response: ISourceName1CurrencyData) => this.serverResponseAdapter.adaptFromSourceName1(response)));
  }

  private sourceName2(): Observable<ICurrencyItem[]> {
    return this.apiService.getXML<string>('daily_utf8.xml')
      .pipe(map((response: string) => this.serverResponseAdapter.adaptFromSourceName2(response)));
  }
}
