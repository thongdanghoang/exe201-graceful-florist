import {SubscriptionAwareComponent} from '../../core/subscription-aware.component';
import {Directive, Injector, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ValidationErrors
} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {of, take} from 'rxjs';
import {BusinessErrorParam} from '../models/abstract-base-dto';
import {InputErrorStateMatcher} from './input-error-state-matcher';

/**
 * Abstract form Component. A base class for form based component which support
 * dirty check on navigation via DirtyCheck guard, programmatic validation.
 */
@Directive()
export abstract class AbstractFormComponent<T>
  extends SubscriptionAwareComponent
  implements OnInit
{
  /**
   * the root form group of the form.
   */
  public formGroup: FormGroup | undefined;

  /**
   * The target entity which is bound to the form input controls
   */
  public data: T | undefined;

  /**
   * form controls of the form.
   */
  formControls: {[key: string]: AbstractControl} | undefined;

  /**
   * Flag in order to prevent double submit issue when the form is submitted. It is set to true when the submit() method is invoked and
   * set to false to release the lock if there's business error return from server via method submitFormResultError(). Other custom
   * handling can added depend use case.
   */
  disableSubmitButton: boolean = false;

  /**
   * Flag to indicate if the submission failed.
   */
  isOnSubmissionFailed: boolean = false;

  errorStateMatcher = new InputErrorStateMatcher();

  /**
   * Submitted flag, it is used to force to show validation error
   * when the form is submitted with validation error.
   */
  protected submitted: boolean = false;

  protected httpClient: HttpClient;
  protected formBuilder: FormBuilder;
  protected translate: TranslateService;

  protected constructor(injector: Injector) {
    super();
    this.httpClient = injector.get(HttpClient);
    this.formBuilder = injector.get(FormBuilder);
    this.translate = injector.get(TranslateService);
  }

  ngOnInit(): void {
    this.formControls = this.initializeFormControls();
    this.formGroup = this.formBuilder.group(this.formControls, {
      validators: this.initializeFormValidation.bind(this)
    });
    this.initializeData();
    this.updateFormControlsState(this.formGroup, [
      (ctr: AbstractControl): void =>
        this.registerSubscription(
          ctr.valueChanges.pipe(take(1)).subscribe(() => ctr.markAsTouched())
        )
    ]);
    this.subscribeToFormChanges();
  }

  /**
   * Validate and submits the form.
   */
  submit(): void {
    this.validateFormBeforeSubmit((): void => this.submitForm(undefined));
  }

  /**
   * Reset the form.
   */
  reset(): void {
    this.submitted = false;
    this.formGroup?.reset();
  }

  /**
   * dirty flag
   */
  isDirty(): boolean {
    return this.formGroup?.dirty ?? false;
  }

  /**
   * Reset state of formGroup back to pristine.
   */
  resetDirty(): void {
    this.formGroup?.markAsPristine();
  }

  /**
   * The actual submit logic of the child class.
   * This is only called when no validation errors found.
   */
  protected submitForm(data: T | undefined): void {
    // TODO:  this.notificationService.clearAll();
    if (this.submitFormDataUrl()) {
      this.disableSubmitBtn();
      this.httpClient
        .request(this.submitFormMethod(), this.submitFormDataUrl(), {
          body: data || this.getSubmitFormData()
        })
        .subscribe({
          next: r => {
            this.showSaveSuccessNotification(r);
            this.enableSubmitBtn();
            this.onSubmitFormDataSuccess(r);
            this.isOnSubmissionFailed = false;
          },
          error: error => {
            this.displayFormResultErrors(error.error);
            this.onSubmitFormRequestError(error);
            this.isOnSubmissionFailed = true;
          }
        });
    } else {
      this.enableSubmitBtn();
      this.onSubmitFormDataSuccess(this.getSubmitFormData());
    }
  }

  protected validateFormBeforeSubmit(validFormSuccess: () => void): void {
    this.submitted = true;
    // Only perform valid check when formGroup is defined.
    this.disableSubmitBtn();
    this.prepareDataBeforeSubmit();
    if (this.formGroup) {
      this.updateFormControlsState(this.formGroup, [
        (ctr: AbstractControl): void => ctr.markAsTouched(),
        (ctr: AbstractControl): void => ctr.markAsDirty(),
        (ctr: AbstractControl): void => ctr.updateValueAndValidity()
      ]);
      this.formGroup.markAsTouched();
      if (this.formGroup.invalid) {
        this.enableSubmitBtn();
        this.showValidationErrorNotification();
        this.onSubmitFormRequestError({});
        return;
      }
    }

    of(this.validateForm())
      .pipe(take(1))
      .subscribe((res: string[]): void => {
        if (!res || res.length === 0) {
          validFormSuccess();
        } else {
          // UI feedback for specific form validation
          this.validateFormError(res);
          this.enableSubmitBtn();
        }
      });
  }

  /**
   * Processing when addition validation logic failed.
   */
  protected validateFormError(res: string[]): void {
    this.onSubmitFormRequestError(res);
  }

  protected displayFormResultErrors(result: any): void {
    if (result?.errorType === 'BUSINESS') {
      // Business error
      if (result?.field && this.formControls) {
        const formControl = this.formControls[result.field];
        if (formControl) {
          let businessError = {
            [result.i18nKey]: {}
          };
          result.args.forEach((arg: BusinessErrorParam) => {
            const errorParam = {[arg.key]: arg.value};
            businessError = {
              [result.i18nKey]: {
                ...errorParam
              }
            };
          });
          formControl.setErrors(businessError);
          formControl.markAsTouched();
          formControl.markAsDirty();
        }
      } else {
        // TODO:  this.notificationService.error({});
      }
    }
  }

  protected submitFormMethod(): string {
    return 'POST';
  }

  protected getSubmitFormData(): any {
    return this.formGroup?.value;
  }

  protected updateFormControlsState(
    formGroup: FormGroup,
    functions: ((formControl: AbstractControl) => void)[]
  ): void {
    for (const control in formGroup.controls) {
      if (formGroup.controls[control]) {
        functions.forEach(fn => fn(formGroup.controls[control]));
        if (
          formGroup.get(control) instanceof FormGroup ||
          formGroup.get(control) instanceof FormArray
        ) {
          this.updateFormControlsState(
            formGroup.get(control) as FormGroup,
            functions
          );
        }
      }
    }
  }

  protected subscribeToFormChanges(): void {
    if (this.formGroup) {
      this.registerSubscription(
        this.formGroup.valueChanges.subscribe((): void => {
          if (this.isOnSubmissionFailed) {
            this.enableSubmitBtn();
          }
        })
      );
    }
  }

  protected convertErrorParams(params: BusinessErrorParam[]): any {
    let result;
    params?.forEach((arg: BusinessErrorParam): void => {
      const errorParam = {[arg.key]: arg.value};
      result = {
        ...errorParam
      };
    });
    return result;
  }

  protected enableSubmitBtn(): void {
    this.disableSubmitButton = false;
  }

  protected disableSubmitBtn(): void {
    this.disableSubmitButton = true;
  }

  /**
   * Initialize the default value for the target entity.
   */
  protected abstract initializeData(): void;

  protected abstract submitFormDataUrl(): string;

  protected abstract onSubmitFormDataSuccess(result: any): void;

  /**
   * Perform additional processing before submit the form.
   */
  protected abstract prepareDataBeforeSubmit(): void;

  protected abstract showSaveSuccessNotification(result: any): void;

  protected abstract showValidationErrorNotification(): void;

  /**
   * Hook when having errors
   */
  protected abstract onSubmitFormRequestError(error: any): void;

  /**
   * Initialize list of controls for the form.
   */
  protected abstract initializeFormControls(): {[key: string]: AbstractControl};

  protected abstract initializeFormValidation(
    control: AbstractControl
  ): ValidationErrors | null;

  /**
   * Validate form before submit
   */
  protected abstract validateForm(): string[];
}
