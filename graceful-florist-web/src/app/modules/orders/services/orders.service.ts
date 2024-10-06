import {Injectable} from '@angular/core';
import {OrderCriteriaDto, OrderDto} from '../models/order.dto';
import {
  SearchCriteriaDto,
  SearchResultDto
} from '../../shared/models/abstract-base-dto';
import {Observable} from 'rxjs';
import {AppRoutingConstants} from '../../../app-routing-constants';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  constructor(private readonly httpClient: HttpClient) {}

  updateOrderStatus(order: OrderDto): Observable<void> {
    return this.httpClient.patch<void>(
      `${AppRoutingConstants.BACKEND_API_URL}/${AppRoutingConstants.ORDERS_MANAGEMENT_PATH}/${order.id}`,
      {value: order.status}
    );
  }

  searchOrders(
    criteria: SearchCriteriaDto<OrderCriteriaDto>
  ): Observable<SearchResultDto<OrderDto>> {
    return this.httpClient.post<SearchResultDto<OrderDto>>(
      `${AppRoutingConstants.BACKEND_API_URL}/${AppRoutingConstants.ORDERS_MANAGEMENT_PATH}`,
      criteria
    );
  }

  getOrderById(id: string): Observable<OrderDto> {
    return this.httpClient.get<OrderDto>(
      `${AppRoutingConstants.BACKEND_API_URL}/${AppRoutingConstants.ORDERS_MANAGEMENT_PATH}/${id}`
    );
  }
}
