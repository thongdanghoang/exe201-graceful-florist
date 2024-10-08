package id.vn.thongdanghoang.graceful.services.impl;

import id.vn.thongdanghoang.graceful.entities.OrderEntity;
import id.vn.thongdanghoang.graceful.repositories.OrderRepository;
import id.vn.thongdanghoang.graceful.services.OrderService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional(rollbackOn = Throwable.class)
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;

    @Override
    public List<OrderEntity> searchOrders(Pageable page) {
        return orderRepository.findOrdersForAdminManagement(page);
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
