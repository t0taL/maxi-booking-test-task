import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-settings-item',
  templateUrl: './settings-item.component.html',
  styleUrls: ['./settings-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsItemComponent implements OnInit {
  @Input() sourceName: string;
  @Input() sourceIndex: number;
  @Input() inUse: boolean;
  @Input() maxSources: number;

  @Output() moveUpEvent: EventEmitter<number> = new EventEmitter<number>();
  @Output() moveDownEvent: EventEmitter<number> = new EventEmitter<number>();

  constructor() {
  }

  ngOnInit(): void {
  }

  moveUp(): void {
    this.moveUpEvent.emit(this.sourceIndex);
  }

  moveDown(): void {
    this.moveDownEvent.emit(this.sourceIndex);
  }
}
