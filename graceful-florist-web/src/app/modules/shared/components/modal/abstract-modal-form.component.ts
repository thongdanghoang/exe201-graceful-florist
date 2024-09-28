import {Directive, Injector} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {Subscription} from 'rxjs';
import {AbstractFormComponent} from '../abstract-form';
import {
  FormDialogOptions,
  IModal,
  ModalService
} from '../../services/modal.service';

@Directive()
export abstract class AbstractModalFormComponent<T>
  extends AbstractFormComponent<T>
  implements IModal
{
  dialogRef!: MatDialogRef<any, T>;
  options!: FormDialogOptions<T>;
  result!: Subscription;
  resolve!: (value?: any | PromiseLike<any>) => void;

  protected modalService: ModalService;

  protected constructor(injector: Injector) {
    super(injector);
    this.modalService = injector.get(ModalService);
  }

  close(param?: any): void {
    this.modalService.close(this, param);
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
