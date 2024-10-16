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
  OrderStatus,
  OrderType
} from '../../../orders/models/order.dto';
import {Observable} from 'rxjs';
import {TableComponent} from '../../../shared/components/table/table.component';
import {Router} from '@angular/router';
import {StaffService} from '../../services/staff.service';
import {uuid} from '../../../../../../graceful-florist-type';
import {AppRoutingConstants} from '../../../../app-routing-constants';

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
    fromInclusive: this.formBuilder.control(null),
    status: this.formBuilder.control(null),
    orderType: this.formBuilder.control(null)
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

  protected readonly orderTypes: OrderType[] = Object.values(OrderType);

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
    this.registerSubscription(
      this.filterFormGroups.valueChanges.subscribe(value => {
        this.pendingOrdersTable.searchCriteria.criteria = {
          ...this.criteria,
          ...value
        };
        this.pendingOrdersTable.search();
      })
    );
  }

  navigateToOrderDetail(orderId: uuid): void {
    void this.router.navigate([
      `${AppRoutingConstants.STAFF_PATH}/${AppRoutingConstants.STAFF_ORDERS_PATH}/${orderId}`
    ]);
  }

  // It's seem mat-calendar is not work with reactive form
  onSelectedDateFilterChanged(value: any): void {
    this.filterFormGroups.get('fromInclusive')?.setValue(value);
  }

  getProductId(id: uuid | undefined): string {
    return id.toString().split('-')[0] ?? '';
  }

  get selectedOrderType(): OrderType {
    return this.filterFormGroups.get('orderType')?.value;
  }

  get orderStatus(): OrderStatus[] {
    return Object.values(OrderStatus);
  }

  get statusFilterLabel(): OrderStatus {
    return this.filterFormGroups.get('status')?.value;
  }

  get dateTypeFilterLabel(): string {
    const fromInclusive = this.filterFormGroups.get('fromInclusive')?.value;
    if (fromInclusive) {
      return fromInclusive.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    }
    return 'Ngày';
  }

  resetFilter(): void {
    this.filterFormGroups.reset();
  }
}
