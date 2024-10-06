package id.vn.thongdanghoang.graceful.repositories;

import id.vn.thongdanghoang.graceful.entities.ProductEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@Repository
public interface ProductRepository extends JpaRepository<ProductEntity, UUID> {

    @Query("""
            SELECT p
            FROM ProductEntity p
            JOIN p.categories c
            WHERE c.id IN :categories
            """)
    Page<ProductEntity> searchByCategories(Set<UUID> categories, Pageable pageable);

    @Query("""
            SELECT p
            FROM ProductEntity p
            JOIN p.categories c
            WHERE c.id IN :categories AND p.enabled = true
            AND p.owner IS NULL
            """)
    Page<ProductEntity> searchEnabledByCategories(Set<UUID> categories, Pageable pageable);

    @Query("""
            SELECT p
            FROM ProductEntity p
            WHERE p.enabled = true
            AND p.owner IS NULL
            """)
    Page<ProductEntity> findAllByEnabledTrue(Pageable pageable);

    @EntityGraph(ProductEntity.PRODUCT_DETAIL_ENTITY_GRAPH)
    @Query("SELECT p FROM ProductEntity p WHERE p.id = :id")
    Optional<ProductEntity> findByIdWithDetail(UUID id);
}

