import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SubscriptionAwareComponent} from '../../../core/subscription-aware.component';

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
export class SidebarComponent
  extends SubscriptionAwareComponent
  implements OnInit
{
  @Input() menuItems: MenuItem[] = [];
  @Input({required: true}) tabChanged!: EventEmitter<string>;
  @Output() readonly itemChanged: EventEmitter<string> =
    new EventEmitter<string>();
  selectedItem: MenuItem | null = null;

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.registerSubscription(
      this.tabChanged.subscribe((tab: string): void => {
        this.selectedItem =
          this.menuItems.find((item: MenuItem): boolean => item.id === tab) ||
          null;
      })
    );
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
