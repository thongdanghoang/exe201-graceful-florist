import {Injectable} from '@angular/core';
import {OrderCriteriaDto, OrderDto, OrderItemDto} from '../models/order.dto';
import {
  SearchCriteriaDto,
  SearchResultDto
} from '../../shared/models/abstract-base-dto';
import {Observable, map} from 'rxjs';
import {AppRoutingConstants} from '../../../app-routing-constants';
import {HttpClient} from '@angular/common/http';
import {ProductDto} from '../../products/models/product.dto';

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
    return this.httpClient
      .post<
        SearchResultDto<OrderDto>
      >(`${AppRoutingConstants.BACKEND_API_URL}/${AppRoutingConstants.ORDERS_MANAGEMENT_PATH}`, criteria)
      .pipe(
        map(
          (result: SearchResultDto<OrderDto>): SearchResultDto<OrderDto> => ({
            total: result.total,
            results: result.results.map(
              (order: OrderDto): OrderDto => ({
                ...order,
                orderItems: order.orderItems.map(
                  (item: OrderItemDto): OrderItemDto => ({
                    ...item,
                    product: this.mapProductImages(item.product)
                  })
                )
              })
            )
          })
        )
      );
  }

  getOrderById(id: string): Observable<OrderDto> {
    return this.httpClient
      .get<OrderDto>(
        `${AppRoutingConstants.BACKEND_API_URL}/${AppRoutingConstants.ORDERS_MANAGEMENT_PATH}/${id}`
      )
      .pipe(
        map(
          (order: OrderDto): OrderDto => ({
            ...order,
            orderItems: order.orderItems.map(
              (item: OrderItemDto): OrderItemDto => ({
                ...item,
                product: this.mapProductImages(item.product)
              })
            )
          })
        )
      );
  }

  private mapProductImages(product: ProductDto): ProductDto {
    return {
      ...product,
      imageUrl: product.images.length
        ? `${AppRoutingConstants.BACKEND_API_URL}/images/${product.images[0]}`
        : '',
      images: product.images.length
        ? product.images
            .slice(1)
            .map(
              image => `${AppRoutingConstants.BACKEND_API_URL}/images/${image}`
            )
        : []
    };
  }
}
