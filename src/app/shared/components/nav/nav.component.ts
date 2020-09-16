import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';


interface INavItem {
  path: string;
  name: string;
}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavComponent implements OnInit {
  navItems: INavItem[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.navItems = [
      { path: '/home', name: 'Главная' },
      { path: '/currency-market', name: 'Рынок валют' }
    ];
  }
}
