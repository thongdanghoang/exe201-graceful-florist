package id.vn.thongdanghoang.graceful.repositories;

import id.vn.thongdanghoang.graceful.entities.OrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface OrderRepository extends JpaRepository<OrderEntity, UUID> {

}

