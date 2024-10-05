package id.vn.thongdanghoang.graceful.services;

import id.vn.thongdanghoang.graceful.entities.OrderEntity;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface OrderService {

    List<OrderEntity> searchOrders(Pageable page);

    Optional<OrderEntity> findOrderById(UUID id);

    void update(OrderEntity order);

    long countOrders();

}
