package id.vn.thongdanghoang.graceful.repositories;

import id.vn.thongdanghoang.graceful.entities.ProductEntity;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Set;
import java.util.UUID;

public class ProductSearchRepositoryImpl implements ProductSearchRepository {

    @PersistenceContext
    private EntityManager em;

    @Override
    public Page<ProductEntity> searchProduct(Pageable pageable, Set<UUID> categories, String keyword, boolean admin, boolean enabled) {
        return null;
    }
}
