import {Injectable} from '@angular/core';
import {OrderCriteriaDto, OrderDto, OrderType} from '../models/order.dto';
import {
  SearchCriteriaDto,
  SearchResultDto
} from '../../shared/models/abstract-base-dto';
import {Observable, map} from 'rxjs';
import {AppRoutingConstants} from '../../../app-routing-constants';
import {HttpClient} from '@angular/common/http';
import {ReportDTO} from '../../admin/model/report.dto';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  constructor(private readonly httpClient: HttpClient) {}

  report(): Observable<ReportDTO> {
    return this.httpClient.get<ReportDTO>(
      `${AppRoutingConstants.BACKEND_API_URL}/${AppRoutingConstants.ADMIN_PATH}/${AppRoutingConstants.REPORT_PATH}`
    );
  }

  updateOrderStatus(order: OrderDto): Observable<void> {
    return this.httpClient.put<void>(
      `${AppRoutingConstants.BACKEND_API_URL}/${AppRoutingConstants.ORDERS_MANAGEMENT_PATH}/${order.id}`,
      {value: order.status}
    );
  }

  searchOrders(
    criteria: SearchCriteriaDto<OrderCriteriaDto>
  ): Observable<SearchResultDto<OrderDto>> {
    return this.httpClient
      .post<
        SearchResultDto<OrderDto>
      >(`${AppRoutingConstants.BACKEND_API_URL}/${AppRoutingConstants.ORDERS_MANAGEMENT_PATH}`, criteria)
      .pipe(
        map(searchResult => {
          searchResult.results.map(orderDto => {
            orderDto.type =
              orderDto.orderItems.filter(item => item.product.owner).length ===
              0
                ? OrderType.NORMAL
                : OrderType.SPECIAL;
            return orderDto;
          });
          return searchResult;
        })
      );
  }

  getOrderById(id: string): Observable<OrderDto> {
    return this.httpClient.get<OrderDto>(
      `${AppRoutingConstants.BACKEND_API_URL}/${AppRoutingConstants.ORDERS_MANAGEMENT_PATH}/${id}`
    );
  }
}
