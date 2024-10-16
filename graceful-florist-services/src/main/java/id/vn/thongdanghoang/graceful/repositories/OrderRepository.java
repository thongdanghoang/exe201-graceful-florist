package id.vn.thongdanghoang.graceful.repositories;

import id.vn.thongdanghoang.graceful.dtos.orders.OrderCriteriaDto;
import id.vn.thongdanghoang.graceful.entities.OrderEntity;
import id.vn.thongdanghoang.graceful.entities.UserEntity;
import id.vn.thongdanghoang.graceful.enums.OrderStatus;
import id.vn.thongdanghoang.graceful.enums.OrderType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface OrderRepository extends JpaRepository<OrderEntity, UUID>, ReportRepository {

    @EntityGraph(OrderEntity.ORDER_MANAGEMENT_ENTITY_GRAPH)
    @Query("""
            SELECT o
            FROM OrderEntity o
            WHERE (:status IS NULL OR o.status = :status)
            AND (:customProduct IS NULL OR o.id IN (
                SELECT oi.order.id
                FROM OrderItemEntity oi
                WHERE (:customProduct = true AND oi.product.owner IS NOT NULL)
                OR (:customProduct = false AND oi.product.owner IS NULL)
            ))
            AND (cast(:fromInclusive as date) IS NULL OR o.createdDate >= :fromInclusive)
            """)
    List<OrderEntity> findOrdersForAdminManagement(OrderStatus status,
                                                   Boolean customProduct,
                                                   LocalDateTime fromInclusive,
                                                   Pageable page);

    Page<OrderEntity> findByStaff(UserEntity staff, Pageable page);

    @Query("""
            SELECT o
            FROM OrderEntity o
            WHERE o.status = 'PENDING'
            AND o.staff IS NULL
            """)
    Page<OrderEntity> staffFindPendingOrders(Pageable page);

    @EntityGraph(OrderEntity.ORDER_MANAGEMENT_ENTITY_GRAPH)
    @Query("SELECT o FROM OrderEntity o WHERE o.id = :id")
    Optional<OrderEntity> findByIdWithDetail(UUID id);
}

