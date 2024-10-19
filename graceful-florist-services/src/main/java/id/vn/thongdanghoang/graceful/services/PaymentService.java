package id.vn.thongdanghoang.graceful.services;

import id.vn.thongdanghoang.graceful.entities.OrderEntity;
import id.vn.thongdanghoang.graceful.entities.ShippingPriceEntity;

import java.util.UUID;

public interface PaymentService {

    OrderEntity createPayment(OrderEntity orderEntity);

    ShippingPriceEntity getById(UUID id);

}
