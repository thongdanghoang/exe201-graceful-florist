import {Component, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup
} from '@angular/forms';
import {BreadcrumbItem} from '../../../shared/components/breadcrumb/breadcrumb.component';
import {AppRoutingConstants} from '../../../../app-routing-constants';

@Component({
  selector: 'graceful-florist-flower-customization',
  templateUrl: './flower-customization.component.html',
  styleUrl: './flower-customization.component.css'
})
export class FlowerCustomizationComponent implements OnInit {
  protected form!: FormGroup;
  protected breadcrumbs: BreadcrumbItem[] = [
    {label: 'Trang chủ', path: AppRoutingConstants.HOME_PATH},
    {label: 'Thiết Kế Hoa'}
  ];
  protected mainColors = [
    {color: 'red', label: 'Màu đỏ'},
    {color: 'white', label: 'Màu trắng'},
    {color: 'orange', label: 'Màu cam'},
    {color: 'pink', label: 'Màu hồng'},
    {color: 'yellow', label: 'Màu vàng'}
  ];
  /**
   * @description: we mainly work on form control,
   * this array just use for quickly remove selected flower from form group
   */
  protected selectedFlowersToBeRemovedFromForm: string[] = [];
  protected flowers = [
    {
      name: 'Hoa Hồng',
      image: 'assets/hoa-hong.png',
      detail: '10.000 - 30.000 VNĐ / 1 bông'
    },
    {
      name: 'Hoa Tulip',
      image: 'assets/hoa-tulip.png',
      detail: '10.000 - 30.000 VNĐ / 1 bông'
    },
    {
      name: 'Hoa Lan (Hồng)',
      image: 'assets/hoa-lan-hong.png',
      detail: '10.000 - 30.000 VNĐ / 1 bông'
    },
    {
      name: 'Hoa Cúc',
      image: 'assets/hoa-cuc.png',
      detail: '10.000 - 30.000 VNĐ / 1 bông'
    },
    {
      name: 'Hoa Đồng Tiền',
      image: 'assets/hoa-dong-tien.png',
      detail: '10.000 - 30.000 VNĐ / 1 bông'
    },
    {
      name: 'Hoa Cẩm Chướng',
      image: 'assets/hoa-cam-chuong.png',
      detail: '10.000 - 30.000 VNĐ / 1 bông'
    },
    {
      name: 'Hoa Lan (Trắng)',
      image: 'assets/hoa-lan-trang.png',
      detail: '10.000 - 30.000 VNĐ / 1 bông'
    },
    {
      name: 'Hoa Lily',
      image: 'assets/hoa-lily.png',
      detail: '10.000 - 30.000 VNĐ / 1 bông'
    },
    {
      name: 'Hoa Thanh Tú',
      image: 'assets/hoa-thanh-tu.png',
      detail: '10.000 - 30.000 VNĐ / 1 bông'
    },
    {
      name: 'Hoa Mẫu Đơn',
      image: 'assets/hoa-mau-don.png',
      detail: '10.000 - 30.000 VNĐ / 1 bông'
    }
  ];

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      selectedMainColor: [''],
      selectedFlowers: this.fb.array([])
    });
  }

  onSelectAllFlowers(isChecked: boolean): void {
    if (isChecked) {
      this.selectedFlowersToBeRemovedFromForm = this.selectedFlowers.value.map(
        (flower: any): string => flower.name
      );
    } else {
      this.selectedFlowersToBeRemovedFromForm = [];
    }
  }

  isSelectedInFlowerList(flower: AbstractControl): boolean {
    return this.selectedFlowersToBeRemovedFromForm.includes(flower.value.name);
  }

  removeAllFlowers(): void {
    this.selectedFlowersToBeRemovedFromForm.forEach((name: string): void => {
      const index = this.selectedFlowers.value.findIndex(
        (flower: any): boolean => flower.name === name
      );
      this.removeFlower(index);
    });
    this.selectedFlowersToBeRemovedFromForm = [];
  }

  onSelectFlower(flower: AbstractControl, isChecked: boolean): void {
    if (isChecked) {
      this.selectedFlowersToBeRemovedFromForm.push(flower.value.name);
    } else {
      this.selectedFlowersToBeRemovedFromForm =
        this.selectedFlowersToBeRemovedFromForm.filter(
          (name: string): boolean => name !== flower.value.name
        );
    }
  }

  get selectedFlowers(): FormArray {
    return this.form.get('selectedFlowers') as FormArray;
  }

  selectColor(color: string): void {
    this.form.get('selectedMainColor')?.setValue(color);
  }

  selectFlower(flower: any): void {
    const selectedFlowers = this.selectedFlowers;
    const index = selectedFlowers.value.findIndex(
      (f: any): boolean => f.name === flower.name
    );
    if (index === -1) {
      selectedFlowers.push(this.fb.control(flower));
    } else {
      this.removeFlower(index);
    }
  }

  isSelectedFlower(flower: any): boolean {
    return this.selectedFlowers.value.some(
      (f: any): boolean => f.name === flower.name
    );
  }

  removeFlower(index: number): void {
    this.selectedFlowersToBeRemovedFromForm =
      this.selectedFlowersToBeRemovedFromForm.filter(
        (name: string): boolean =>
          name !== this.selectedFlowers.at(index).value.name
      );
    this.selectedFlowers.removeAt(index);
  }
}
