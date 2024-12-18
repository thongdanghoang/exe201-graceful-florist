import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {
  SearchCriteriaDto,
  SearchResultDto
} from '../../shared/models/abstract-base-dto';
import {Observable} from 'rxjs';
import {OrderCriteriaDto, OrderDto} from '../../orders/models/order.dto';
import {AppRoutingConstants} from '../../../app-routing-constants';
import {uuid} from '../../../../../graceful-florist-type';

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  private readonly STAFF_ORDERS_URL: string = `${AppRoutingConstants.BACKEND_API_URL}/${AppRoutingConstants.STAFF_PATH}/${AppRoutingConstants.STAFF_ORDERS_PATH}`;
  private readonly STAFF_PENDING_ORDERS_URL: string = `${AppRoutingConstants.BACKEND_API_URL}/${AppRoutingConstants.STAFF_PATH}/${AppRoutingConstants.STAFF_PENDING_ORDERS_PATH}`;
  private readonly STAFF_RECEIVE_ORDERS_URL: string = `${AppRoutingConstants.BACKEND_API_URL}/${AppRoutingConstants.STAFF_PATH}/${AppRoutingConstants.STAFF_ORDERS_PATH}`;

  constructor(private readonly httpClient: HttpClient) {}

  getPendingOrders(
    searchCriteria: SearchCriteriaDto<OrderCriteriaDto>
  ): Observable<SearchResultDto<OrderDto>> {
    return this.httpClient.post<SearchResultDto<OrderDto>>(
      this.STAFF_PENDING_ORDERS_URL,
      searchCriteria
    );
  }

  getOrders(
    searchCriteria: SearchCriteriaDto<OrderCriteriaDto>
  ): Observable<SearchResultDto<OrderDto>> {
    return this.httpClient.post<SearchResultDto<OrderDto>>(
      this.STAFF_ORDERS_URL,
      searchCriteria
    );
  }

  receiveOrder(orderId: uuid): Observable<OrderDto> {
    return this.httpClient.put<OrderDto>(
      `${this.STAFF_RECEIVE_ORDERS_URL}/${orderId}`,
      {}
    );
  }
}
