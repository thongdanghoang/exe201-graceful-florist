import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {MatSort, MatSortable, Sort} from '@angular/material/sort';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {SelectionModel} from '@angular/cdk/collections';
import {AbstractSearchComponent} from '../abstract-search-component';
import {SearchPageDto, SortDto} from '../../models/abstract-base-dto';
import {CellTableTemplateDirective} from './cell-table-template.directive';
import {HeaderTableTemplateDirective} from './header-table-template.directive';

@Component({
  selector: 'graceful-florist-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent<C, R>
  extends AbstractSearchComponent<C, R>
  implements OnInit, AfterViewInit, AfterContentInit
{
  @ViewChild(MatSort) matSort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ContentChildren(HeaderTableTemplateDirective)
  headerTemplates!: QueryList<HeaderTableTemplateDirective>;
  @ContentChildren(CellTableTemplateDirective)
  cellTemplates!: QueryList<CellTableTemplateDirective>;

  headerTemplateMap: {[key: string]: TemplateRef<any>} = {};
  cellTemplateMap: {[key: string]: TemplateRef<any>} = {};

  @Input() searchOnInit: boolean = true;
  @Input() pageSizeOptions: number[] = [5, 10, 25, 100];
  @Input({required: true}) displayedColumns!: string[];
  @Input({required: true}) sort!: SortDto;
  @Output() readonly rowClicked = new EventEmitter<R>();

  selection: SelectionModel<R> = new SelectionModel<R>(true, []);

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

  ngAfterContentInit(): void {
    // Map header templates based on the column
    this.headerTemplates.forEach(
      (headerTemplate: HeaderTableTemplateDirective): void => {
        const column: string = headerTemplate.column;
        if (this.displayedColumns.includes(column)) {
          this.headerTemplateMap[column] = headerTemplate.templateRef;
        }
      }
    );
    // Map cell templates based on the column
    this.cellTemplates.forEach(
      (cellTemplate: CellTableTemplateDirective): void => {
        const column: string = cellTemplate.column;
        if (this.displayedColumns.includes(column)) {
          this.cellTemplateMap[column] = cellTemplate.templateRef;
        }
      }
    );
  }

  defaultHeaderTemplate(column: string): string {
    return column.toUpperCase();
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

  get dynamicDisplayedColumns(): string[] {
    return this.displayedColumns.filter(column => column !== 'select');
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
