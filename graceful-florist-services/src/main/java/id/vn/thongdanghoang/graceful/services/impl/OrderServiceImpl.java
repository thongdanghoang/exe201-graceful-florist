package id.vn.thongdanghoang.graceful.services.impl;

import id.vn.thongdanghoang.graceful.dtos.orders.OrderCriteriaDto;
import id.vn.thongdanghoang.graceful.entities.OrderEntity;
import id.vn.thongdanghoang.graceful.entities.UserEntity;
import id.vn.thongdanghoang.graceful.enums.OrderStatus;
import id.vn.thongdanghoang.graceful.enums.OrderType;
import id.vn.thongdanghoang.graceful.repositories.OrderRepository;
import id.vn.thongdanghoang.graceful.repositories.UserRepository;
import id.vn.thongdanghoang.graceful.services.OrderService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional(rollbackOn = Throwable.class)
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;

    @Override
    public List<OrderEntity> searchOrders(OrderCriteriaDto criteria, Pageable page) {
        var customProduct = Objects.nonNull(criteria.orderType())
                ? criteria.orderType() == OrderType.SPECIAL
                : null;
        var fromInclusive = criteria.fromInclusive();
        return orderRepository.findOrdersForAdminManagement(
                criteria.status(),
                customProduct,
                fromInclusive,
                page
        );
    }

    @Override
    public Page<OrderEntity> staffOrders(UserEntity staff, Pageable page) {
        return orderRepository.findByStaff(staff, page);
    }

    @Override
    public Page<OrderEntity> staffSearchPendingOrders(Pageable page) {
        return orderRepository.staffFindPendingOrders(page);
    }

    @Override
    public OrderEntity staffReceiveOrder(UUID orderId, UserEntity staff) {
        var order = orderRepository
                .findById(orderId).orElseThrow();
        if (order.getStatus() == OrderStatus.PENDING && Objects.isNull(order.getStaff())) {
            order.setStatus(OrderStatus.PROCESSING);
            order.setStaff(staff);
            orderRepository.save(order);
            return order;
        }
        throw new IllegalStateException("Order is not pending");
    }

    @Override
    public Optional<OrderEntity> findOrderById(UUID id) {
        return orderRepository.findByIdWithDetail(id);
    }

    @Override
    public void update(OrderEntity order) {
        orderRepository.save(order);
    }

    @Override
    public long countOrders() {
        return orderRepository.count();
    }

    @Override
    public long totalOrders() {
        return orderRepository.count();
    }

    @Override
    public long totalOrdersLastWeek() {
        return orderRepository.totalOrdersLastWeek();
    }

    @Override
    public long totalOrdersPending() {
        return orderRepository.totalOrdersPending();
    }

    @Override
    public long totalOrdersPendingLastWeek() {
        return orderRepository.totalOrdersPendingLastWeek();
    }

    @Override
    public long totalRevenue() {
        return orderRepository.totalRevenue();
    }

    @Override
    public long totalRevenueLastWeek() {
        return orderRepository.totalRevenueLastWeek();
    }

    @Override
    public List<Long> thisMonthRevenue() {
        return orderRepository.thisMonthRevenue();
    }

    @Override
    public List<Long> thisYearRevenue() {
        return orderRepository.thisYearRevenue();
    }
}
