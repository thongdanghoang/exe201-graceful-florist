import {Component, Injector, OnInit, inject} from '@angular/core';
import {FormDialogOptions} from '../../../shared/services/modal.service';
import {OrderDto} from '../../models/order.dto';
import {AbstractModalFormComponent} from '../../../shared/components/modal/abstract-modal-form.component';
import {AbstractControl, ValidationErrors, Validators} from '@angular/forms';
import {OrdersService} from '../../services/orders.service';
import {uuid} from '../../../../../../graceful-florist-type';
import {catchError} from 'rxjs';
import {ProductService} from '../../../products/services/product.service';

export interface OrderRatingModalOptions extends FormDialogOptions<OrderDto> {}

@Component({
  selector: 'graceful-florist-rating',
  templateUrl: './rating.component.html'
})
export class RatingComponent
  extends AbstractModalFormComponent<OrderDto>
  implements OnInit
{
  ratingFormControls: {
    [key: string]: AbstractControl<any, any>;
  } = {
    rating: this.formBuilder.control(5, [Validators.min(1), Validators.max(5)]),
    description: this.formBuilder.control('', [Validators.required]),
    images: this.formBuilder.control([]),
    anonymous: this.formBuilder.control(false)
  };

  private readonly orderService: OrdersService = inject(OrdersService);
  private readonly productService: ProductService = inject(ProductService);

  constructor(injector: Injector) {
    super(injector);
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  get images(): uuid[] {
    return this.formGroup.get('images')?.value;
  }

  get rating(): number {
    return this.formGroup.get('rating')?.value;
  }

  get ratingLabel(): string {
    switch (this.rating) {
      case 1:
        return 'Rất tệ';
      case 2:
        return 'Tệ';
      case 3:
        return 'Không tốt';
      case 4:
        return 'Khá ổn';
      case 5:
        return 'Rất tốt';
      default:
        return '';
    }
  }

  setRating(value: number): void {
    this.formGroup.get('rating')?.setValue(value);
  }

  onImageUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.registerSubscription(
        this.productService
          .uploadImage(input.files[0])
          .pipe(
            catchError(error => {
              alert(`Upload image failed because of: ${JSON.stringify(error)}`);
              return [];
            })
          )
          .subscribe((id: uuid): void => {
            this.formGroup
              .get('images')
              ?.setValue([...(this.images || []), id]);
          })
      );
    }
  }

  protected override initializeData(): void {
    if (this.options?.data?.data.id) {
      this.registerSubscription(
        this.orderService.getOrderById(this.options.data.data.id).subscribe(
          (order: OrderDto): void => {
            this.data = order;
          },
          (): void => {
            this.initDefaultData();
          }
        )
      );
    }
    this.data = this.initDefaultData();
  }

  protected override initDefaultData(): OrderDto {
    return {} as OrderDto;
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
    return this.ratingFormControls;
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
