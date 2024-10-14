import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable, Subscription, of} from 'rxjs';
import {FormControl} from '@angular/forms';
import {SubscriptionAwareComponent} from '../../../core/subscription-aware.component';
import {HttpClient} from '@angular/common/http';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  switchMap
} from 'rxjs/operators';

@Component({
  selector: 'graceful-florist-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.css'
})
export class AutocompleteComponent
  extends SubscriptionAwareComponent
  implements OnInit
{
  @Input() suggestionUrl: string | undefined;
  @Output() readonly selectedKeyword: EventEmitter<string> =
    new EventEmitter<string>();
  control = new FormControl('');
  filteredSuggestions: Observable<string[]> = of([]);
  private valueChangesSubscription: Subscription | undefined;

  constructor(private readonly httpClient: HttpClient) {
    super();
  }

  ngOnInit(): void {
    this.setupValueChanges();
  }

  onSearchSubmit(): void {
    const keyword = this.control.value;
    if (keyword) this.selectedKeyword.emit(keyword);
  }

  onOptionSelected(event: any): void {
    if (this.valueChangesSubscription) {
      this.valueChangesSubscription.unsubscribe();
    }
    this.selectedKeyword.emit(event.option.value);
    this.setupValueChanges(); // Re-subscribe to value changes after emitting the selected keyword
  }

  private setupValueChanges(): void {
    this.valueChangesSubscription = this.control.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(value => this._fetchSuggestions(value || ''))
      )
      .subscribe(suggestions => {
        this.filteredSuggestions = of(suggestions);
      });
  }

  private _fetchSuggestions(keyword: string): Observable<string[]> {
    if (!this.suggestionUrl) {
      return of([]);
    }
    return this.httpClient
      .get<string[]>(`${this.suggestionUrl}?keyword=${keyword}`)
      .pipe(
        catchError(() => of([])) // Handle errors gracefully
      );
  }
}
