package id.vn.thongdanghoang.graceful.repositories;

import id.vn.thongdanghoang.graceful.entities.CategoryEntity;
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

}

