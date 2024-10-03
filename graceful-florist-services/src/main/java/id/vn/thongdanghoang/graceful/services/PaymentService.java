package id.vn.thongdanghoang.graceful.services;

import id.vn.thongdanghoang.graceful.entities.OrderEntity;
import id.vn.thongdanghoang.graceful.entities.ShippingPriceEntity;

public interface PaymentService {

    OrderEntity createPayment(OrderEntity orderEntity);

    ShippingPriceEntity getRandomShippingPrice();

}
