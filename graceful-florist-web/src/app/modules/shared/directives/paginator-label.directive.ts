import {Directive, Input, OnInit} from '@angular/core';
import {MatPaginatorIntl} from '@angular/material/paginator';

@Directive({
  selector: '[customPaginatorLabel]'
})
export class PaginatorLabelDirective implements OnInit {
  @Input({required: true}) itemsPerPageLabel!: string;
  @Input({required: true}) nextPageLabel!: string;
  @Input({required: true}) previousPageLabel!: string;
  @Input({required: true}) firstPageLabel!: string;
  @Input({required: true}) lastPageLabel!: string;

  constructor(private readonly matPaginatorIntl: MatPaginatorIntl) {}

  ngOnInit(): void {
    this.matPaginatorIntl.itemsPerPageLabel = this.itemsPerPageLabel;
    this.matPaginatorIntl.nextPageLabel = this.nextPageLabel;
    this.matPaginatorIntl.previousPageLabel = this.previousPageLabel;
    this.matPaginatorIntl.firstPageLabel = this.firstPageLabel;
    this.matPaginatorIntl.lastPageLabel = this.lastPageLabel;
    this.matPaginatorIntl.changes.next();
  }
}
