package id.vn.thongdanghoang.graceful.repositories;

import id.vn.thongdanghoang.graceful.entities.OrderRatingEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface OrderRatingRepository extends JpaRepository<OrderRatingEntity, UUID> {

    @EntityGraph(OrderRatingEntity.COMMENT_ENTITY_GRAPH)
    @Query("""
            SELECT ore
            FROM OrderRatingEntity ore
            JOIN ore.products p
            WHERE p.id = :productId
            """)
    Page<OrderRatingEntity> searchComment(UUID productId, Pageable pageable);

}

