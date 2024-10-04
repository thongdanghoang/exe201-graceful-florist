package id.vn.thongdanghoang.graceful.repositories;

import id.vn.thongdanghoang.graceful.entities.OrderEntity;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface OrderRepository extends JpaRepository<OrderEntity, UUID> {

    @EntityGraph(OrderEntity.ORDER_MANAGEMENT_ENTITY_GRAPH)
    @Query("SELECT o FROM OrderEntity o")
    List<OrderEntity> findOrdersForAdminManagement();

    @EntityGraph(OrderEntity.ORDER_MANAGEMENT_ENTITY_GRAPH)
    @Query("SELECT o FROM OrderEntity o WHERE o.id = :id")
    Optional<OrderEntity> findByIdWithDetail(UUID id);
}

