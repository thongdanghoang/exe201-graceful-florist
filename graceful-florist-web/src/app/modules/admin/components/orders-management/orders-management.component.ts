import {Component, OnInit, ViewChild} from '@angular/core';
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
  OrderStatus,
  OrderType
} from '../../../orders/models/order.dto';
import {OrdersService} from '../../../orders/services/orders.service';
import {uuid} from '../../../../../../graceful-florist-type';
import {SubscriptionAwareComponent} from '../../../core/subscription-aware.component';
import {TableComponent} from '../../../shared/components/table/table.component';

@Component({
  selector: 'graceful-florist-orders-management',
  templateUrl: './orders-management.component.html'
})
export class OrdersManagementComponent
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

  @ViewChild('ordersTable') ordersTable!: TableComponent<
    OrderCriteriaDto,
    OrderDto
  >;

  protected readonly orderTypes: OrderType[] = Object.values(OrderType);

  constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly ordersService: OrdersService
  ) {
    super();
  }

  ngOnInit(): void {
    this.fetchProduct = this.ordersService.searchOrders.bind(
      this.ordersService
    );
    this.sort = {
      column: 'deliveryDate',
      direction: 'asc'
    };
    this.criteria = {} as OrderCriteriaDto;
    this.registerSubscription(
      this.filterFormGroups.valueChanges.subscribe(value => {
        this.ordersTable.searchCriteria.criteria = {
          ...this.criteria,
          ...value
        };
        this.ordersTable.search();
      })
    );
  }

  openAdminOrderDetail(order: OrderDto): void {
    void this.router.navigate([`${this.router.url}/${order.id}`]);
  }

  // It's seem mat-calendar is not work with reactive form
  onSelectedDateFilterChanged(value: any): void {
    this.filterFormGroups.get('fromInclusive')?.setValue(value);
  }

  getProductId(id: uuid | undefined): string {
    return id.toString().split('-')[0] ?? '';
  }

  get orderStatus(): OrderStatus[] {
    return Object.values(OrderStatus);
  }

  get selectedOrderType(): OrderType {
    return this.filterFormGroups.get('orderType')?.value;
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
