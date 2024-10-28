import {Component, Injector, inject} from '@angular/core';
import {BreadcrumbItem} from '../modules/shared/components/breadcrumb/breadcrumb.component';
import {AppRoutingConstants} from '../app-routing-constants';
import {UserService} from '../mock/user.service';
import {AbstractFormComponent} from '../modules/shared/components/abstract-form';
import {UserDto} from '../modules/products/models/product.dto';
import {AbstractControl, ValidationErrors, Validators} from '@angular/forms';
import {catchError} from 'rxjs';
import {uuid} from '../../../graceful-florist-type';
import {ProductService} from '../modules/products/services/product.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'graceful-florist-user-profile',
  templateUrl: './user-profile.component.html'
})
export class UserProfileComponent extends AbstractFormComponent<UserDto> {
  userProfileFormControls = {
    id: this.formBuilder.control(null),
    version: this.formBuilder.control(0),
    firstName: this.formBuilder.control('', [Validators.required]),
    lastName: this.formBuilder.control('', [Validators.required]),
    email: this.formBuilder.control(''),
    address: this.formBuilder.control(''),
    currentPassword: this.formBuilder.control(''),
    newPassword: this.formBuilder.control(''),
    confirmPassword: this.formBuilder.control(''),
    avatar: this.formBuilder.control('')
  };

  protected breadcrumbs: BreadcrumbItem[] = [
    {label: 'Trang chủ', path: AppRoutingConstants.HOME_PATH},
    {label: 'Quản lý tài khoản'}
  ];

  private readonly userService: UserService = this.injector.get(UserService);
  private readonly productService: ProductService = inject(ProductService);
  private readonly _snackBar: MatSnackBar = inject(MatSnackBar);

  constructor(private readonly injector: Injector) {
    super(injector);
  }

  protected override initializeData(): void {
    this.registerSubscription(
      this.userService.getUserDetail().subscribe({
        next: user => {
          this.data = user;
          this.formGroup.patchValue(user);
        }
      })
    );
  }

  protected override submitFormDataUrl(): string {
    return AppRoutingConstants.USER_PROFILE_URL;
  }

  protected override submitFormMethod(): string {
    return 'PUT';
  }

  protected override onSubmitFormDataSuccess(result: UserDto): void {
    this.data = result;
    this.formGroup.patchValue(result);
  }

  protected override prepareDataBeforeSubmit(): void {}

  protected override showSaveSuccessNotification(): void {
    this._snackBar.open('Cập nhật thông tin thành công', 'Đóng', {
      duration: 3000
    });
  }

  protected override showValidationErrorNotification(): void {}

  protected override onSubmitFormRequestError(): void {
    this._snackBar.open('Cập nhật thông tin thất bại', 'Đóng', {
      duration: 3000
    });
  }

  protected override initializeFormControls(): {
    [key: string]: AbstractControl<any, any>;
  } {
    return this.userProfileFormControls;
  }

  protected override initializeFormValidation(): ValidationErrors | null {
    return null;
  }

  protected override validateForm(): string[] {
    return [];
  }

  protected uploadAvatar(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.registerSubscription(
        this.productService
          .uploadImage(input.files[0])
          .pipe(
            catchError(error => {
              alert(`Upload image failed${JSON.stringify(error)}`);
              return [];
            })
          )
          .subscribe((id: uuid): void => {
            this.userProfileFormControls.avatar.setValue(id);
          })
      );
    }
  }
}
