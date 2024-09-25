import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import {MatSort, MatSortable, Sort} from '@angular/material/sort';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {SelectionModel} from '@angular/cdk/collections';
import {AbstractSearchComponent} from '../abstract-search-component';
import {SearchPageDto, SortDto} from '../../models/abstract-base-dto';
import {
  ProductCriteriaDto,
  ProductDto
} from '../../../products/models/product.dto';

@Component({
  selector: 'graceful-florist-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent
  extends AbstractSearchComponent<ProductCriteriaDto, ProductDto>
  implements OnInit, AfterViewInit
{
  @ViewChild(MatSort) matSort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input() searchOnInit = true; // Will trigger search event on init component
  @Input() pageSizeOptions: number[] = [5, 10, 25, 100];
  @Input({required: true}) sort!: SortDto; // Init sort
  displayedColumns: string[] = ['select', 'name', 'price'];
  selection: SelectionModel<ProductDto> = new SelectionModel<ProductDto>(
    true,
    []
  );

  private readonly systemPageSize: number = 25;

  constructor() {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();
    if (this.searchOnInit) {
      this.submit();
    }
  }

  ngAfterViewInit(): void {
    if (this.sort) {
      const sortableField: MatSortable = {
        id: this.sort.column,
        start: this.sort.direction === 'asc' ? 'asc' : 'desc',
        disableClear: false
      };
      setTimeout((): void => {
        this.matSort.sort(sortableField);
      });
    }
  }

  onPageChange(pageEvent: PageEvent): void {
    this.searchCriteria.page.limit = pageEvent.pageSize;
    this.searchCriteria.page.offset =
      pageEvent.pageIndex * this.searchCriteria.page.limit;
    this.search();
  }

  onSortChange(sortEvent: Sort): void {
    if (
      sortEvent.active !== this.sort?.column ||
      sortEvent.direction !== this.sort?.direction
    ) {
      this.sort = {
        column: sortEvent.active,
        direction: sortEvent.direction
      };
      this.searchCriteria.sort = this.sort;
      this.search();
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected(): boolean {
    const numSelected: number = this.selection
      ? this.selection.selected.length
      : 0;
    const numRows: number = this.searchResult.results.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows(): void {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.searchResult.results.forEach(row => this.selection.select(row));
  }

  protected override initSearchDto(): void {
    const pageDto: SearchPageDto = {
      offset: 0,
      limit: this.systemPageSize
    };

    this.searchCriteria = {
      page: pageDto,
      criteria: this.criteria,
      sort: this.sort
    };
  }

  protected override afterSearch(): void {
    // TODO: Implement this method
  }

  protected override resetPage(): void {
    super.resetPage();
    if (this.paginator) {
      this.paginator.firstPage();
    }
  }
}
