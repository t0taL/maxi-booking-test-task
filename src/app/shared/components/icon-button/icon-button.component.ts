import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconButtonComponent implements OnInit {
  @Input() color?: string = '#ffffff';
  @Input() bgColor?: string = '#000000';
  @Input() disabled?: boolean = false;

  @Output() clickEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit(): void {
  }

  click(): void {
    this.clickEvent.emit();
  }
}
