import {Directive, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable, of} from 'rxjs';
import {SubscriptionAwareComponent} from '../../core/subscription-aware.component';
import {SearchCriteriaDto, SearchResultDto} from '../models/abstract-base-dto';

@Directive()
export abstract class AbstractSearchComponent<C, R>
  extends SubscriptionAwareComponent
  implements OnInit
{
  // Function to execute search event
  @Input({required: true}) fetch!: (
    criteria: SearchCriteriaDto<C>
  ) => Observable<SearchResultDto<R>>;
  // Validate filter before search
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error already initialized in ngOnInit
  @Input() filterValidator: (criteria: C) => Observable<string[]>;
  @Input({required: true}) criteria!: C;
  @Input() noDataMsg: string = 'No data found';
  searchResult: SearchResultDto<R>;
  searchCriteria: SearchCriteriaDto<C>;

  @Output() readonly searchCompleted: EventEmitter<SearchResultDto<R>> =
    new EventEmitter<SearchResultDto<R>>();

  protected constructor() {
    super();
    this.searchResult = {
      results: [],
      total: 0
    };
    this.searchCriteria = {
      criteria: this.criteria,
      page: {
        offset: 0,
        limit: 10
      }
    } as SearchCriteriaDto<C>;
  }

  ngOnInit(): void {
    this.initSearchDto();
    if (!this.filterValidator) {
      this.filterValidator = (): Observable<string[]> => of([]);
    }
  }

  submit(): void {
    this.searchCriteria.criteria = this.criteria;
    this.registerSubscription(
      this.filterValidator(this.searchCriteria.criteria).subscribe(err => {
        if (err && err.length > 0) {
          // TODO : showSimpleErrorNotification
        } else {
          this.resetPage();
        }
        this.search();
      })
    );
  }

  search(): void {
    this.beforeSearch();
    this.registerSubscription(
      this.fetch(this.searchCriteria).subscribe({
        next: (result: SearchResultDto<R>): void => {
          this.searchResult = result;
          this.afterSearch();
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        error: _error => {
          // TODO : showSimpleErrorNotification
        },
        complete: (): void => this.searchCompleted.emit(this.searchResult)
      })
    );
  }

  reset(): void {
    this.initSearchDto();
    this.resetSearchResult();

    this.searchCompleted.emit(this.searchResult);
    this.afterSearch();
  }

  protected beforeSearch(): void {
    // Do nothing on super class
  }

  protected resetSearchResult(): void {
    this.searchResult = {
      results: [],
      total: 0
    };
  }

  protected abstract afterSearch(): void;

  protected abstract initSearchDto(): void;

  protected resetPage(): void {
    this.searchCriteria.page.offset = 0;
  }
}
