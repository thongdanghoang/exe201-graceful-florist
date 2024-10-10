import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../../products/services/product.service';
import {ModalService} from '../../../shared/services/modal.service';
import {Router} from '@angular/router';
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
import {AppRoutingConstants} from '../../../../app-routing-constants';
import {OrdersService} from '../../../orders/services/orders.service';
import {uuid} from '../../../../../../graceful-florist-type';
import {ReportDTO} from '../../model/report.dto';
import {SubscriptionAwareComponent} from '../../../core/subscription-aware.component';

@Component({
  selector: 'graceful-florist-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent
  extends SubscriptionAwareComponent
  implements OnInit
{
  fetchProduct!: (
    criteria: SearchCriteriaDto<OrderCriteriaDto>
  ) => Observable<SearchResultDto<OrderDto>>;
  sort!: SortDto;
  criteria!: OrderCriteriaDto;

  reportDTO: ReportDTO | undefined;
  dailyChartOptions: any;
  monthlyChartOptions: any;

  constructor(
    private readonly router: Router,
    private readonly modalService: ModalService,
    private readonly productService: ProductService,
    private readonly ordersService: OrdersService
  ) {
    super();
  }

  ngOnInit(): void {
    this.registerSubscription(
      this.ordersService.report().subscribe((reportDTO: ReportDTO): void => {
        this.reportDTO = reportDTO;
        this.initDailyChartOptions();
        this.initMonthlyChartOptions();
      })
    );
    this.fetchProduct = this.ordersService.searchOrders.bind(
      this.ordersService
    );
    this.sort = {
      column: 'lastModifiedDate',
      direction: 'asc'
    };
    this.criteria = {
      status: OrderStatus.PENDING
    };
  }

  // eslint-disable-next-line max-lines-per-function
  initDailyChartOptions(): void {
    this.dailyChartOptions = {
      series: [
        {
          name: 'Daily Sales',
          data: this.reportDTO?.thisMonthRevenue ?? []
        }
      ],
      chart: {
        type: 'line',
        height: 350,
        fontFamily: 'Nunito, sans-serif',
        toolbar: {
          show: true,
          tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true
          }
        },
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 150
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350
          }
        }
      },
      xaxis: {
        categories: Array.from({length: 31}, (_, i) => i + 1),
        title: {
          text: 'Ngày trong tháng'
        }
      },
      yaxis: {
        title: {
          text: 'Doanh số (₫)'
        }
      },
      tooltip: {
        enabled: true,
        shared: false,
        intersect: true,
        x: {
          show: true
        },
        y: {
          formatter(value: number): string {
            return `$${value.toFixed(2)}`;
          }
        }
      },
      colors: ['#FF6F91'],
      stroke: {
        curve: 'smooth',
        width: 2
      }
    };
  }

  // eslint-disable-next-line max-lines-per-function
  initMonthlyChartOptions(): void {
    this.monthlyChartOptions = {
      series: [
        {
          name: 'Monthly Total Sales',
          data: this.reportDTO?.thisYearRevenue ?? []
        }
      ],
      chart: {
        type: 'line',
        height: 350,
        fontFamily: 'Nunito, sans-serif',
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 150
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350
          }
        }
      },
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec'
        ],
        title: {
          text: 'Tháng'
        }
      },
      yaxis: {
        title: {
          text: 'Tổng doanh số (₫)'
        }
      },
      tooltip: {
        enabled: true,
        shared: false,
        intersect: true,
        x: {
          show: true
        },
        y: {
          formatter(value: number): string {
            return `$${value.toFixed(2)}`;
          }
        }
      },
      colors: ['#FF6F91'],
      stroke: {
        curve: 'smooth',
        width: 3
      },
      legend: {
        show: true,
        position: 'top'
      }
    };
  }

  generateDailyData(): number[] {
    return Array.from(
      {length: 31},
      () => Math.floor(Math.random() * 1000) + 100
    );
  }

  generateMonthlyData(): number[] {
    return Array.from(
      {length: 12},
      () => Math.floor(Math.random() * 50000) + 10000
    );
  }

  getProductId(id: uuid | undefined): string {
    return id.toString().split('-')[0] ?? '';
  }

  openAdminOrder(): void {
    void this.router.navigate([
      `${AppRoutingConstants.ADMIN_PATH}/${AppRoutingConstants.ORDERS_MANAGEMENT_PATH}`
    ]);
  }

  openAdminOrderDetail(order: OrderDto): void {
    void this.router.navigate([
      `${AppRoutingConstants.ADMIN_PATH}/${AppRoutingConstants.ORDERS_MANAGEMENT_PATH}/${order.id}`
    ]);
  }
}
