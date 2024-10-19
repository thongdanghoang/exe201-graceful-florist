import {Component, Injector} from '@angular/core';
import {BreadcrumbItem} from '../modules/shared/components/breadcrumb/breadcrumb.component';
import {AppRoutingConstants} from '../app-routing-constants';
import {Router} from '@angular/router';
import {UserService} from '../mock/user.service';
import {AbstractFormComponent} from '../modules/shared/components/abstract-form';
import {UserDto} from '../modules/products/models/product.dto';
import {AbstractControl, ValidationErrors, Validators} from '@angular/forms';

@Component({
  selector: 'graceful-florist-user-profile',
  templateUrl: './user-profile.component.html'
})
export class UserProfileComponent extends AbstractFormComponent<UserDto> {
  userProfileFormControls: {
    [key: string]: AbstractControl<any, any>;
  } = {
    id: this.formBuilder.control(null),
    version: this.formBuilder.control(0),
    firstName: this.formBuilder.control('', [Validators.required]),
    lastName: this.formBuilder.control('', [Validators.required]),
    email: this.formBuilder.control('', [Validators.required]),
    address: this.formBuilder.control('', [Validators.required]),
    currentPassword: this.formBuilder.control(''),
    newPassword: this.formBuilder.control(''),
    confirmPassword: this.formBuilder.control('')
  };

  protected breadcrumbs: BreadcrumbItem[] = [
    {label: 'Trang chủ', path: AppRoutingConstants.HOME_PATH},
    {label: 'Quản lý tài khoản'}
  ];

  private readonly router: Router = this.injector.get(Router);
  private readonly userService: UserService = this.injector.get(UserService);

  constructor(private readonly injector: Injector) {
    super(injector);
  }
  protected override initializeData(): void {
    throw new Error('Method not implemented.');
  }
  protected override submitFormDataUrl(): string {
    throw new Error('Method not implemented.');
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected override onSubmitFormDataSuccess(result: any): void {}

  protected override prepareDataBeforeSubmit(): void {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected override showSaveSuccessNotification(result: any): void {}

  protected override showValidationErrorNotification(): void {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected override onSubmitFormRequestError(error: any): void {}

  protected override initializeFormControls(): {
    [key: string]: AbstractControl<any, any>;
  } {
    return this.userProfileFormControls;
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

  protected get username(): string {
    return this.userService.getUser()?.username ?? '';
  }
}
