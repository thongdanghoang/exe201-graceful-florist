import {Component, Input} from '@angular/core';

export interface MenuItem {
  name: string;
  children?: MenuItem[];
  expanded?: boolean;
}
@Component({
  selector: 'graceful-florist-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Input() menuItems: MenuItem[] = [
    {
      name: 'Dashboard',
      children: [{name: 'Analytics'}, {name: 'CRM'}, {name: 'eCommerce'}]
    },
    {
      name: 'Applications',
      children: [{name: 'Calendar'}, {name: 'Chat'}, {name: 'Mail'}]
    },
    {name: 'Authentication'},
    {name: 'Utility'}
  ];

  constructor() {}

  toggleSubmenu(item: MenuItem): void {
    if (item.children) {
      item.expanded = !item.expanded;
    }
  }
}
