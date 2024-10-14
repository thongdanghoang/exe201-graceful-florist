package id.vn.thongdanghoang.graceful.repositories;

import id.vn.thongdanghoang.graceful.entities.ProductEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Set;
import java.util.UUID;

public interface ProductSearchRepository {

    Page<ProductEntity> searchProduct(Pageable pageable,
                                      Set<UUID> categories,
                                      String keyword,
                                      boolean admin,
                                      boolean enabled);

}
