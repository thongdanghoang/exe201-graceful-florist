import {Component, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {BreadcrumbItem} from '../../../shared/components/breadcrumb/breadcrumb.component';
import {AppRoutingConstants} from '../../../../app-routing-constants';
import {IngredientDto, IngredientType} from '../../models/product.dto';
import {ProductService} from '../../services/product.service';
import {CategoryService} from '../../../admin/services/category.service';
import {SubscriptionAwareComponent} from '../../../core/subscription-aware.component';
import {CategoryDto, CategoryType} from '../../../admin/model/category.dto';
import {uuid} from '../../../../../../graceful-florist-type';

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
    mainFlowers: this.formBuilder.control([], Validators.minLength(1)),
    layout: this.formBuilder.control(null),
    secondaryFlower: this.formBuilder.control(null, Validators.required),
    message: this.formBuilder.control('', Validators.required),
    wrapper: this.formBuilder.control(null),
    accessories: this.formBuilder.control([])
  };
  protected form: FormGroup = this.formBuilder.group(
    this.flowerCustomizationFormControls
  );

  protected categories: CategoryDto[] = [];
  protected ingredients: IngredientDto[] = [];
  /**
   * @description: we mainly work on form control,
   * this array just use for quickly remove selected flower from form group
   */
  protected selectedMainFlowers: Map<uuid, IngredientDto> = new Map();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService
  ) {
    super();
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe((value: any): void => {
      // eslint-disable-next-line no-console
      console.log(value);
    });
    this.registerSubscriptions([
      this.categoryService
        .getEnabledCategories()
        .subscribe(categories => (this.categories = categories)),
      this.productService
        .getIngredients()
        .subscribe(ingredients => (this.ingredients = ingredients))
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

  selectRadioButton(value: string, group: string): void {
    this.form.get(group)?.setValue(value);
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
    // eslint-disable-next-line no-console
    console.log(this.form.value);
  }
}
