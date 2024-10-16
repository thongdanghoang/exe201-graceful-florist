package id.vn.thongdanghoang.graceful.repositories;

import id.vn.thongdanghoang.graceful.dtos.products.CategoryCriteriaDto;
import id.vn.thongdanghoang.graceful.entities.CategoryEntity;
import id.vn.thongdanghoang.graceful.enums.CategoryType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@Repository
public interface CategoryRepository extends JpaRepository<CategoryEntity, UUID> {

    @Query("SELECT c FROM CategoryEntity c WHERE c.enabled = true")
    List<CategoryEntity> findEnabledCategories();

    @Query("SELECT c FROM CategoryEntity c WHERE c.id IN :ids")
    Set<CategoryEntity> findAllById(Set<UUID> ids);

    @Query("""
            SELECT c
            FROM CategoryEntity c
            WHERE (:type IS NULL OR c.type = :type)
            AND (:enabled IS NULL OR c.enabled = :enabled)
            """)
    Page<CategoryEntity> searchCategory(CategoryType type,
                                        Boolean enabled,
                                        Pageable page);

}

