import {Directive, Injector, ViewChild} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {Subscription} from 'rxjs';
import {AbstractFormComponent} from '../abstract-form';
import {
  DialogOptions,
  FormDialogOptions,
  IModal,
  ModalService
} from '../../services/modal.service';
import {ModalTemplateComponent} from './modal-template.component';

export interface BasicModalOptions extends DialogOptions<string> {
  title: string;
  body?: string;
  bodyTranslateParams?: any;
  detail?: string;
  primaryBtn?: string;
  hidePrimary?: boolean;
  secondaryBtn?: string;
  hideSecondary?: boolean;
  primaryBtnClass?: string;
  multiLine?: boolean;
}
@Directive()
export abstract class AbstractModalFormComponent<T>
  extends AbstractFormComponent<T>
  implements IModal
{
  dialogRef!: MatDialogRef<any, T>;
  options!: FormDialogOptions<T>;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  result: Subscription;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  type: string;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  resolve: (value?: any | PromiseLike<any>) => void;

  @ViewChild('modal') modal!: ModalTemplateComponent;

  protected modalService: ModalService;

  protected constructor(injector: Injector) {
    super(injector);
    this.modalService = injector.get(ModalService);
  }

  close(param?: any): void {
    this.modalService.close(this, param);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected override onSubmitFormRequestError(error: any): void {
    // super.onSubmitFormRequestError(error) -> must implement onSubmitFormRequestError
    this.modal.enableSubmitButton();
  }

  protected override enableSubmitBtn(): void {
    super.enableSubmitBtn();
    this.modal.enableSubmitButton();
  }

  protected override disableSubmitBtn(): void {
    super.disableSubmitBtn();
    this.modal.disableSubmitButton();
  }

  protected override initializeData(): void {
    this.data = this.options?.data?.data;
    if (!this.data) {
      this.data = this.initDefaultData();
    }
    if (this.formGroup && this.data) {
      this.formGroup.patchValue(this.data);
    }
  }

  protected abstract initDefaultData(): T;

  protected override submitFormDataUrl(): string {
    return this.options?.data?.submitUrl ?? '';
  }
}
