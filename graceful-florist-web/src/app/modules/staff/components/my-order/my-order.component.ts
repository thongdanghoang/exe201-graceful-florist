import {Component, OnInit, ViewChild} from '@angular/core';
import {SubscriptionAwareComponent} from '../../../core/subscription-aware.component';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {
  SearchCriteriaDto,
  SearchResultDto,
  SortDto
} from '../../../shared/models/abstract-base-dto';
import {
  OrderCriteriaDto,
  OrderDto,
  OrderStatus
} from '../../../orders/models/order.dto';
import {Observable} from 'rxjs';
import {TableComponent} from '../../../shared/components/table/table.component';
import {Router} from '@angular/router';
import {StaffService} from '../../services/staff.service';
import {uuid} from '../../../../../../graceful-florist-type';

@Component({
  selector: 'graceful-florist-my-order',
  templateUrl: './my-order.component.html'
})
export class MyOrderComponent
  extends SubscriptionAwareComponent
  implements OnInit
{
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

  @ViewChild('pendingOrdersTable') pendingOrdersTable!: TableComponent<
    OrderCriteriaDto,
    OrderDto
  >;

  constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly staffService: StaffService
  ) {
    super();
  }

  ngOnInit(): void {
    this.fetchProduct = this.staffService.getOrders.bind(this.staffService);
    this.sort = {
      column: 'deliveryDate',
      direction: 'asc'
    };
    this.criteria = {} as OrderCriteriaDto;
  }

  receiveOrder(order: OrderDto): void {
    this.registerSubscription(
      this.staffService.receiveOrder(order.id).subscribe((): void => {
        this.pendingOrdersTable.search();
      })
    );
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
