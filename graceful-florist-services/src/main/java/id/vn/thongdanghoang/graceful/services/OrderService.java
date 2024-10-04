package id.vn.thongdanghoang.graceful.services;

import id.vn.thongdanghoang.graceful.entities.OrderEntity;

import java.util.List;

public interface OrderService {

    List<OrderEntity> searchOrders();

    long countOrders();

}
