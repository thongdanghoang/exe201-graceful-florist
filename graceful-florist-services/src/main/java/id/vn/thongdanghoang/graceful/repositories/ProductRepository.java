package id.vn.thongdanghoang.graceful.repositories;

import id.vn.thongdanghoang.graceful.entities.ProductEntity;
import id.vn.thongdanghoang.graceful.enums.CategoryType;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
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

    @Query(value = """
            SELECT p.name
            FROM graceful.products p
            WHERE to_tsvector('english', unaccent(p.name)) @@ to_tsquery('english', unaccent(:keyword) || ':*')
            """, nativeQuery = true)
    List<String> fullTextSearch(String keyword);

    @Query("""
            SELECT p
            FROM ProductEntity p
            JOIN p.categories c
            WHERE (:categories IS NULL OR EXISTS (SELECT c FROM p.categories c WHERE c.id IN :categories))
            AND (:keyword IS NULL OR LOWER(p.name) LIKE %:keyword%)
            AND p.enabled = :enabled
            AND (:admin = true OR p.owner IS NULL)
            AND (:categoryType IS NULL OR c.type = :categoryType)
            AND (cast(:fromInclusive as date) IS NULL OR p.createdDate >= :fromInclusive)
            """)
    Page<ProductEntity> searchProduct(Set<UUID> categories,
                                      String keyword,
                                      CategoryType categoryType,
                                      LocalDateTime fromInclusive,
                                      boolean enabled,
                                      boolean admin,
                                      Pageable pageable);

    @Query("""
            SELECT p
            FROM ProductEntity p
            JOIN p.categories c
            WHERE (:categories IS NULL OR EXISTS (SELECT c FROM p.categories c WHERE c.id IN :categories))
            AND (:keyword IS NULL OR LOWER(p.name) LIKE %:keyword%)
            AND (:admin = true OR p.owner IS NULL)
            AND (:categoryType IS NULL OR c.type = :categoryType)
            AND (cast(:fromInclusive as date) IS NULL OR p.createdDate >= :fromInclusive)
            """)
    Page<ProductEntity> searchProduct(Set<UUID> categories,
                                      String keyword,
                                      CategoryType categoryType,
                                      LocalDateTime fromInclusive,
                                      boolean admin,
                                      Pageable pageable);
}

