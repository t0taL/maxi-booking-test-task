import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ISelectOption } from '@shared/interfaces/select-option.interface';


@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent implements OnInit {
  @Input() items: ISelectOption[];
  @Input() placeholder?: string = '';
  @Input() multiple: boolean = false;

  @Output() addEvent: EventEmitter<ISelectOption> = new EventEmitter<ISelectOption>();
  @Output() removeEvent: EventEmitter<ISelectOption> = new EventEmitter<ISelectOption>();
  @Output() clearEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit(): void {
  }

  add(option: ISelectOption): void {
    this.addEvent.emit(option);
  }

  remove(option: ISelectOption): void {
    this.removeEvent.emit(option);
  }

  clear(): void {
    this.clearEvent.emit();
  }
}
