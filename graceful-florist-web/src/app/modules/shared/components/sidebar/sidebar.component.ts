import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

export interface MenuItem {
  id: string;
  name: string;
  children?: MenuItem[];
  expanded?: boolean;
}
@Component({
  selector: 'graceful-florist-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  @Input() menuItems: MenuItem[] = [];
  @Input() defaultSelectedItemId: string | null = null;
  @Output() readonly itemChanged: EventEmitter<string> =
    new EventEmitter<string>();
  selectedItem: MenuItem | null = null;

  constructor() {}

  ngOnInit(): void {
    if (this.defaultSelectedItemId) {
      this.selectedItem =
        this.menuItems.find(
          (item: MenuItem): boolean => item.id === this.defaultSelectedItemId
        ) || null;
    }
  }

  toggleSubmenu(item: MenuItem): void {
    if (item.children) {
      item.expanded = !item.expanded;
    }
  }

  selectItem(item: MenuItem): void {
    this.selectedItem = item;
    this.itemChanged.emit(item.id);
  }
}
