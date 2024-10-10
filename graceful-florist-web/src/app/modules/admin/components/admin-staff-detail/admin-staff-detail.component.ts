import {Component, Injector, OnInit} from '@angular/core';
import {AbstractModalFormComponent} from '../../../shared/components/modal/abstract-modal-form.component';
import {StaffDTO} from '../../model/staff.dto';
import {AbstractControl, ValidationErrors, Validators} from '@angular/forms';
import {FormDialogOptions} from '../../../shared/services/modal.service';

export interface StaffDetailModalOptions extends FormDialogOptions<StaffDTO> {
  title: string;
}
@Component({
  selector: 'graceful-florist-admin-staff-detail',
  templateUrl: './admin-staff-detail.component.html'
})
export class AdminStaffDetailComponent
  extends AbstractModalFormComponent<StaffDTO>
  implements OnInit
{
  staffFormControls: {
    [key: string]: AbstractControl<any, any>;
  } = {
    id: this.formBuilder.control(null),
    version: this.formBuilder.control(null),
    username: this.formBuilder.control(null, [Validators.required]),
    password: this.formBuilder.control(null, [Validators.required]),
    firstName: this.formBuilder.control(null, [Validators.required]),
    lastName: this.formBuilder.control(null, [Validators.required])
  };

  constructor(injector: Injector) {
    super(injector);
  }
  override ngOnInit(): void {
    super.ngOnInit();
    if (this.options?.data?.data.id) {
      // disable username field
      this.formGroup.get('username')?.disable();
    }
  }

  protected get isEditMode(): boolean {
    return !!this.options?.data?.data.id;
  }

  protected override submitFormMethod(): string {
    return 'PUT';
  }

  protected override initDefaultData(): StaffDTO {
    return {} as StaffDTO;
  }
  protected override onSubmitFormDataSuccess(result: any): void {
    this.close(result);
  }
  protected override prepareDataBeforeSubmit(): void {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected override showSaveSuccessNotification(result: any): void {}

  protected override showValidationErrorNotification(): void {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected override onSubmitFormRequestError(error: any): void {}

  protected override initializeFormControls(): {
    [key: string]: AbstractControl<any, any>;
  } {
    return this.staffFormControls;
  }
  protected override initializeFormValidation(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    control: AbstractControl<any, any>
  ): ValidationErrors | null {
    return null;
  }
  protected override validateForm(): string[] {
    return [];
  }
}
