package id.vn.thongdanghoang.graceful.services;

import id.vn.thongdanghoang.graceful.dtos.orders.OrderCriteriaDto;
import id.vn.thongdanghoang.graceful.entities.OrderEntity;
import id.vn.thongdanghoang.graceful.entities.UserEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface OrderService {

    List<OrderEntity> searchOrders(OrderCriteriaDto criteria, Pageable page);

    Page<OrderEntity> staffOrders(UserEntity staff, Pageable page);

    Page<OrderEntity> staffSearchPendingOrders(Pageable page);

    OrderEntity staffReceiveOrder(UUID orderId, UserEntity staff);

    Optional<OrderEntity> findOrderById(UUID id);

    void update(OrderEntity order);

    long countOrders();

    long totalOrders();

    long totalOrdersLastWeek();

    long totalOrdersPending();

    long totalOrdersPendingLastWeek();

    long totalRevenue();

    long totalRevenueLastWeek();

    List<Long> thisMonthRevenue();

    List<Long> thisYearRevenue();
}
