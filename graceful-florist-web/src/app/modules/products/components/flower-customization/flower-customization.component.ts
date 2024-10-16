import {Component, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {BreadcrumbItem} from '../../../shared/components/breadcrumb/breadcrumb.component';
import {AppRoutingConstants} from '../../../../app-routing-constants';
import {
  IngredientDto,
  IngredientType,
  ProductCustomDTO,
  ProductCustomPriceDto
} from '../../models/product.dto';
import {ProductService} from '../../services/product.service';
import {CategoryService} from '../../../admin/services/category.service';
import {SubscriptionAwareComponent} from '../../../core/subscription-aware.component';
import {CategoryDto, CategoryType} from '../../../admin/model/category.dto';
import {uuid} from '../../../../../../graceful-florist-type';
import {Router} from '@angular/router';
import {CartService} from '../../../cart/services/cart.service';
import {MatCheckboxChange} from '@angular/material/checkbox';

@Component({
  selector: 'graceful-florist-flower-customization',
  templateUrl: './flower-customization.component.html',
  styleUrl: './flower-customization.component.css'
})
export class FlowerCustomizationComponent
  extends SubscriptionAwareComponent
  implements OnInit
{
  protected breadcrumbs: BreadcrumbItem[] = [
    {label: 'Trang chủ', path: AppRoutingConstants.HOME_PATH},
    {label: 'Thiết Kế Hoa'}
  ];
  protected flowerCustomizationFormControls: {
    [key: string]: AbstractControl<any, any>;
  } = {
    color: this.formBuilder.control(null, Validators.required),
    mainFlowers: this.formBuilder.control([]),
    layout: this.formBuilder.control(null, Validators.required),
    secondaryFlower: this.formBuilder.control([]),
    message: this.formBuilder.control('', Validators.required),
    wrapper: this.formBuilder.control([]),
    accessories: this.formBuilder.control([]),
    customPrice: this.formBuilder.control(null, Validators.required)
  };
  protected form: FormGroup = this.formBuilder.group(
    this.flowerCustomizationFormControls
  );

  protected categories: CategoryDto[] = [];
  protected ingredients: IngredientDto[] = [];
  protected customPrices: ProductCustomPriceDto[] = [];
  /**
   * @description: we mainly work on form control,
   * this array just use for quickly remove selected flower from form group
   */
  protected selectedMainFlowers: Map<uuid, IngredientDto> = new Map();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService,
    private readonly cartService: CartService,
    private readonly router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.registerSubscriptions([
      this.categoryService
        .getEnabledCategories()
        .subscribe(categories => (this.categories = categories)),
      this.productService
        .getIngredients()
        .subscribe(ingredients => (this.ingredients = ingredients)),
      this.productService
        .getCustomPrices()
        .subscribe(prices => (this.customPrices = prices))
    ]);
  }

  get mainFlowersFormValue(): IngredientDto[] {
    return this.form.get('mainFlowers')?.value;
  }

  get mainColors(): CategoryDto[] {
    return this.categories.filter(
      (category: CategoryDto): boolean => category.type === CategoryType.COLOR
    );
  }

  selectColor(color: CategoryDto): void {
    this.form.get('color')?.setValue(color);
  }

  get flowers(): IngredientDto[] {
    return this.ingredients.filter(
      (ingredient: IngredientDto): boolean =>
        ingredient.type === IngredientType.MAIN_FLOWER
    );
  }

  get flowersAndGreenLeaves(): IngredientDto[] {
    return this.ingredients.filter(
      (ingredient: IngredientDto): boolean =>
        ingredient.type === IngredientType.SECONDARY_FLOWER
    );
  }

  get accessories(): IngredientDto[] {
    return this.ingredients.filter(
      (ingredient: IngredientDto): boolean =>
        ingredient.type === IngredientType.ACCESSORIES
    );
  }

  get layouts(): IngredientDto[] {
    return this.ingredients.filter(
      (ingredient: IngredientDto): boolean =>
        ingredient.type === IngredientType.LAYOUT
    );
  }

  get wrappers(): IngredientDto[] {
    return this.ingredients.filter(
      (ingredient: IngredientDto): boolean =>
        ingredient.type === IngredientType.PACKAGING
    );
  }

  selectLayout(value: IngredientDto): void {
    this.form.get('layout')?.setValue(value);
  }

  selectPrice(value: ProductCustomPriceDto): void {
    this.form.get('customPrice')?.setValue(value);
  }

  getSelectedValues(formControlName: string): any {
    return this.form.get(formControlName)?.value;
  }

  onCheckboxChange(
    event: MatCheckboxChange,
    index: number,
    options: any[],
    formControlName: string
  ): void {
    const formValues = this.getSelectedValues(formControlName);
    if (event.checked) {
      formValues.push(options[index]);
    } else {
      const i = formValues.findIndex(
        (value: any): boolean => value.id === options[index].id
      );
      formValues.splice(i, 1);
    }
  }

  isSelectedFlowerInFormControl(flower: IngredientDto): boolean {
    const index = this.mainFlowersFormValue.findIndex(
      (value: IngredientDto): boolean => value.id === flower.id
    );
    return index !== -1;
  }

  onMainFlowerClick(flower: IngredientDto): void {
    if (this.selectedMainFlowers.has(flower.id)) {
      this.selectedMainFlowers.delete(flower.id);
    }
    // check mainFlowersFormArray already has this flower
    const index: number = this.mainFlowersFormValue.findIndex(
      (value: IngredientDto): boolean => value.id === flower.id
    );
    if (index === -1) {
      this.mainFlowersFormValue.push(flower);
    } else {
      this.mainFlowersFormValue.splice(index, 1);
    }
  }

  onSelectFlower(flower: IngredientDto, checked: boolean): void {
    if (checked) {
      this.selectedMainFlowers.set(flower.id, flower);
    } else {
      this.selectedMainFlowers.delete(flower.id);
    }
  }

  onSelectAllFlowers = (checked: boolean): void => {
    if (checked) {
      this.mainFlowersFormValue.forEach((flower: IngredientDto): void => {
        this.selectedMainFlowers.set(flower.id, flower);
      });
    } else {
      this.selectedMainFlowers.clear();
    }
  };

  onCountChanged(count: number, flower: IngredientDto): void {
    if (count > 0) {
      this.mainFlowersFormValue.filter(
        (value: IngredientDto): boolean => value.id === flower.id
      )[0].quantity = count;
    }
    if (count === 0) {
      this.form
        .get('mainFlowers')
        ?.setValue(
          this.mainFlowersFormValue.filter(
            (value: IngredientDto): boolean => value.id !== flower.id
          )
        );
    }
  }

  removeFlower(flower: IngredientDto): void {
    this.selectedMainFlowers.delete(flower.id);
    this.form
      .get('mainFlowers')
      ?.setValue(
        this.mainFlowersFormValue.filter(
          (value: IngredientDto): boolean => value.id !== flower.id
        )
      );
  }

  removeAllFlowersFromSelectedList(): void {
    this.selectedMainFlowers.clear();
    this.form.get('mainFlowers')?.setValue([]);
  }

  submit(): void {
    const payload: ProductCustomDTO = {
      price: 0,
      description: this.form.get('message')?.value,
      categories: [this.form.get('color')?.value],
      customPrice: this.form.get('customPrice')?.value,
      ingredients: [
        this.form.get('layout')?.value,
        ...(this.form.get('mainFlowers')?.value ?? []),
        ...(this.form.get('accessories')?.value ?? []),
        ...(this.form.get('secondaryFlower')?.value ?? []),
        ...(this.form.get('wrapper')?.value ?? [])
      ]
    };
    this.registerSubscription(
      this.productService.addCustomProduct(payload).subscribe((): void => {
        this.cartService.fetchCartItems().subscribe((cartItems: any): void => {
          this.cartService.cartItemsChanged.next(cartItems);
          void this.router.navigate([`${AppRoutingConstants.CART_PATH}`]);
        });
      })
    );
  }
}
