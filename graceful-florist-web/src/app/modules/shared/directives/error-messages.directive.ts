import {
  AfterViewInit,
  ContentChild,
  Directive,
  OnDestroy,
  Optional
} from '@angular/core';
import {MatInput} from '@angular/material/input';
import {FormGroupDirective, NgForm, ValidationErrors} from '@angular/forms';
import {MatSelect} from '@angular/material/select';
import {Observable, Subject, merge} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {MatChipGrid} from '@angular/material/chips';

@Directive({
  selector: '[gracefulFloristErrorMessage]'
})
export class ErrorMessagesDirective implements AfterViewInit, OnDestroy {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  @ContentChild(MatInput) matInput;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  @ContentChild(MatSelect) matSelect;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  @ContentChild(MatChipGrid) matChipGrid;
  readonly errors$: Observable<ValidationErrors>;
  private readonly errors = new Subject<ValidationErrors>();
  private readonly form: NgForm | FormGroupDirective;
  private readonly unsubscribe = new Subject<void>();

  constructor(
    @Optional() ngForm: NgForm,
    @Optional() formGroupDirective: FormGroupDirective
  ) {
    this.errors$ = this.errors.asObservable();
    this.form = ngForm || formGroupDirective;

    if (!this.form) {
      throw new Error(
        'The ErrorMessagesDirective needs to be either within a NgForm or a FormGroupDirective!'
      );
    }
  }

  ngAfterViewInit(): void {
    const ctrl =
      this.matInput?.ngControl ||
      this.matSelect?.ngControl ||
      this.matChipGrid?.ngControl;
    if (ctrl) {
      this.errors.next(ctrl.errors); // because 1st statusChange occurs before ngAfterViewInit
      merge(this.form.ngSubmit, ctrl.statusChanges)
        .pipe(takeUntil(this.unsubscribe))
        .subscribe(() => {
          this.errors.next(ctrl.errors);
        });
    }
  }

  ngOnDestroy(): void {
    this.errors.complete();
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
