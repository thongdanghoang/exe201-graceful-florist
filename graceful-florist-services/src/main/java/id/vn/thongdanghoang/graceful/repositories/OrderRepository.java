package id.vn.thongdanghoang.graceful.repositories;

import id.vn.thongdanghoang.graceful.entities.OrderEntity;
import id.vn.thongdanghoang.graceful.entities.UserEntity;
import id.vn.thongdanghoang.graceful.enums.OrderStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
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
    Page<OrderEntity> findOrdersForAdminManagement(OrderStatus status,
                                                   Boolean customProduct,
                                                   LocalDateTime fromInclusive,
                                                   Pageable page);

    @EntityGraph(OrderEntity.ORDER_MANAGEMENT_ENTITY_GRAPH)
    Page<OrderEntity> findByUserId(UUID userId, Pageable page);

    @EntityGraph(OrderEntity.ORDER_MANAGEMENT_ENTITY_GRAPH)
    @Query("""
            SELECT o
            FROM OrderEntity o
            WHERE (o.staff = :staff)
            AND (:customProduct IS NULL OR o.id IN (
                SELECT oi.order.id
                FROM OrderItemEntity oi
                WHERE (:customProduct = true AND oi.product.owner IS NOT NULL)
                OR (:customProduct = false AND oi.product.owner IS NULL)
            ))
            AND (cast(:fromInclusive as date) IS NULL OR o.createdDate >= :fromInclusive)
            """)
    Page<OrderEntity> staffSearchOrders(Boolean customProduct,
                                        LocalDateTime fromInclusive,
                                        UserEntity staff,
                                        Pageable page);

    @EntityGraph(OrderEntity.ORDER_MANAGEMENT_ENTITY_GRAPH)
    @Query("""
            SELECT o
            FROM OrderEntity o
            WHERE (o.status = 'PENDING')
            AND (:customProduct IS NULL OR o.id IN (
                SELECT oi.order.id
                FROM OrderItemEntity oi
                WHERE (:customProduct = true AND oi.product.owner IS NOT NULL)
                OR (:customProduct = false AND oi.product.owner IS NULL)
            ))
            AND (cast(:fromInclusive as date) IS NULL OR o.createdDate >= :fromInclusive)
            """)
    Page<OrderEntity> staffFindPendingOrders(Boolean customProduct,
                                             LocalDateTime fromInclusive,
                                             Pageable page);

    @EntityGraph(OrderEntity.ORDER_MANAGEMENT_ENTITY_GRAPH)
    @Query("SELECT o FROM OrderEntity o WHERE o.id = :id")
    Optional<OrderEntity> findByIdWithDetail(UUID id);
}

