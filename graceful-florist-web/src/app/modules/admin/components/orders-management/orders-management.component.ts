import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {
  SearchCriteriaDto,
  SearchResultDto,
  SortDto
} from '../../../shared/models/abstract-base-dto';
import {Observable} from 'rxjs';
import {
  OrderCriteriaDto,
  OrderDto,
  OrderStatus
} from '../../../orders/models/order.dto';
import {OrdersService} from '../../../orders/services/orders.service';
import {uuid} from '../../../../../../graceful-florist-type';

@Component({
  selector: 'graceful-florist-orders-management',
  templateUrl: './orders-management.component.html'
})
export class OrdersManagementComponent implements OnInit {
  filterFormControls: {
    [key: string]: AbstractControl<any, any>;
  } = {
    dateType: this.formBuilder.control(null),
    optionalDate: this.formBuilder.control(null),
    status: this.formBuilder.control(null),
    categories: this.formBuilder.control(null)
  };
  filterFormGroups: FormGroup = this.formBuilder.group(this.filterFormControls);

  fetchProduct!: (
    criteria: SearchCriteriaDto<OrderCriteriaDto>
  ) => Observable<SearchResultDto<OrderDto>>;
  sort!: SortDto;
  criteria!: OrderCriteriaDto;

  constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    this.fetchProduct = this.ordersService.searchOrders.bind(
      this.ordersService
    );
    this.sort = {
      column: 'deliveryDate',
      direction: 'asc'
    };
    this.criteria = {} as OrderCriteriaDto;
  }

  openAdminOrderDetail(order: OrderDto): void {
    void this.router.navigate([`${this.router.url}/${order.id}`]);
  }

  // It's seem mat-calendar is not work with reactive form
  onSelectedDateFilterChanged(value: any): void {
    this.filterFormGroups.get('optionalDate')?.setValue(value);
  }

  getProductId(id: uuid | undefined): string {
    return id.toString().split('-')[0] ?? '';
  }

  get orderStatus(): OrderStatus[] {
    return Object.values(OrderStatus);
  }

  get statusFilterLabel(): OrderStatus {
    return this.filterFormGroups.get('status')?.value;
  }

  get dateTypeFilterLabel(): string {
    const dateType = this.filterFormGroups.get('dateType')?.value;
    const optionalDate = this.filterFormGroups.get('optionalDate')?.value;

    if (!dateType) {
      return 'Ngày';
    } else if (dateType === 'optional' && optionalDate) {
      return optionalDate.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } else if (dateType === 'newest') {
      return 'Gần Nhất';
    } else if (dateType === 'oldest') {
      return 'Cũ nhất';
    }
    return 'Ngày';
  }

  resetFilter(): void {
    this.filterFormGroups.reset();
  }
}
