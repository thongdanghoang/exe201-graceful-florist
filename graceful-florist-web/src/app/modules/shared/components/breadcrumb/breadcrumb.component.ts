import {Component, EventEmitter, Input, Output} from '@angular/core';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

@Component({
  selector: 'graceful-florist-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.css'
})
export class BreadcrumbComponent {
  @Input({required: true}) breadcrumbs: BreadcrumbItem[] = [];
  @Output() readonly breadcrumbClick = new EventEmitter<BreadcrumbItem>();

  protected onBreadcrumbClick(item: BreadcrumbItem): void {
    this.breadcrumbClick.emit(item);
  }
}
