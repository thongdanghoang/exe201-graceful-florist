package id.vn.thongdanghoang.graceful.services;

import id.vn.thongdanghoang.graceful.entities.CategoryEntity;
import id.vn.thongdanghoang.graceful.entities.ProductEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

public interface ProductService {

    ProductEntity createProduct(ProductEntity productEntity);

    ProductEntity updateProduct(ProductEntity productEntity);

    Page<ProductEntity> searchProducts(Set<UUID> categories, Pageable page);

    Optional<ProductEntity> getProductById(UUID id);

    CategoryEntity saveOrUpdateCategory(CategoryEntity categoryEntity);

    List<CategoryEntity> getEnabledCategories();

    List<CategoryEntity> getEnabledCategories(Pageable page);

    Set<CategoryEntity> searchCategoriesByCategoriesID(Set<UUID> categoriesID);

}
