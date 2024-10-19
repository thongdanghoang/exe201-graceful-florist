import {Component, OnInit, ViewChild} from '@angular/core';
import {BreadcrumbItem} from '../modules/shared/components/breadcrumb/breadcrumb.component';
import {AppRoutingConstants} from '../app-routing-constants';
import {
  SearchCriteriaDto,
  SearchResultDto,
  SortDto
} from '../modules/shared/models/abstract-base-dto';
import {
  OrderCriteriaDto,
  OrderDto,
  OrderStatus
} from '../modules/orders/models/order.dto';
import {Observable} from 'rxjs';
import {uuid} from '../../../graceful-florist-type';
import {Router} from '@angular/router';
import {OrdersService} from '../modules/orders/services/orders.service';
import {UserService} from '../mock/user.service';
import {ModalService} from '../modules/shared/services/modal.service';
import {
  OrderRatingModalOptions,
  RatingComponent
} from '../modules/orders/components/rating/rating.component';
import {TableComponent} from '../modules/shared/components/table/table.component';

@Component({
  selector: 'graceful-florist-user-orders',
  templateUrl: './user-orders.component.html'
})
export class UserOrdersComponent implements OnInit {
  fetchProduct!: (
    criteria: SearchCriteriaDto<OrderCriteriaDto>
  ) => Observable<SearchResultDto<OrderDto>>;
  sort!: SortDto;
  criteria: OrderCriteriaDto = {};

  @ViewChild('userOrders') userOrders!: TableComponent<
    OrderCriteriaDto,
    OrderDto
  >;

  protected readonly OrderStatus = OrderStatus;
  protected breadcrumbs: BreadcrumbItem[] = [
    {label: 'Trang chủ', path: AppRoutingConstants.HOME_PATH},
    {label: 'Đơn hàng của tôi'}
  ];

  constructor(
    private readonly router: Router,
    private readonly ordersService: OrdersService,
    private readonly userService: UserService,
    private readonly modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.fetchProduct = this.ordersService.searchOrders.bind(
      this.ordersService
    );
    this.sort = {
      column: 'createdDate',
      direction: 'desc'
    };
  }

  protected openRatingModal(order: OrderDto): void {
    const options: OrderRatingModalOptions = {
      title: 'Đánh giá sản phẩm',
      data: {
        data: order,
        submitUrl: `${AppRoutingConstants.BACKEND_API_URL}/${AppRoutingConstants.ORDERS_PATH}/${order.id}/rating`
      }
    };
    void this.modalService.open(RatingComponent, options).then((): void => {
      this.userOrders.search();
    });
  }

  protected get username(): string {
    return this.userService.getUser()?.username ?? '';
  }

  protected navigateToOrderDetail(id: uuid): void {
    void this.router.navigate([`${AppRoutingConstants.ORDERS_PATH}/${id}`]);
  }

  protected simplifyUUID(id: uuid | undefined): string {
    return id.toString().split('-')[0] ?? '';
  }
}
