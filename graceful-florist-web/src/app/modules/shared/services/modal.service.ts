import {Injectable, Type} from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef
} from '@angular/material/dialog';
import {KeyValue} from '../models/abstract-base-dto';
import {Subscription} from 'rxjs';
import {Arrays} from '../utils/arrays.util';

export interface IModal {
  dialogRef: MatDialogRef<any>;
  resolve: (value?: any | PromiseLike<any>) => void;
  options: KeyValue;
  type?: string;
  result: Subscription;
  close: () => void;
  submit: () => void;
}

export declare class DialogOptions<D> extends MatDialogConfig<D> {
  title: string;
}

export declare class FormDialogOptions<D> extends DialogOptions<object> {
  data?: {data: D; submitUrl?: string};
  refData?: any;
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  public static readonly DEFAULT_DIALOG_WIDTH = '440px';

  private instances: IModal[] = [];

  constructor(private readonly matDialog: MatDialog) {}

  open<T extends IModal, D>(
    component: Type<T>,
    options: DialogOptions<D>
  ): Promise<any> {
    const dialogRef = this.matDialog.open(component, options);
    return new Promise((resolve: (value?: any | PromiseLike<any>) => void) => {
      const modal = dialogRef.componentInstance as IModal;
      modal.dialogRef = dialogRef;
      modal.resolve = resolve;
      modal.options = modal.options || {};
      modal.options = {
        ...modal.options,
        ...options
      };
      modal.result = dialogRef.afterClosed().subscribe(() => {
        Arrays.remove(this.instances, modal);
      });
      this.instances.push(modal);
    });
  }

  close<T extends IModal>(instance: T, result?: any): void {
    this.closeInternal(instance, result);
    Arrays.remove(this.instances, instance);
  }

  closeAll(): void {
    for (const i of this.instances) {
      this.closeInternal(i);
    }
    this.clearModalInstance();
  }

  clearModalInstance(): void {
    this.instances = [];
  }

  hasOpeningDialog(): boolean {
    return this.matDialog.openDialogs?.length > 0;
  }

  private closeInternal<T extends IModal>(instance: T, result?: any): void {
    instance.resolve(result);
    instance.dialogRef.close();
  }
}
