package id.vn.thongdanghoang.graceful.services;

import id.vn.thongdanghoang.graceful.entities.CategoryEntity;
import id.vn.thongdanghoang.graceful.entities.ProductEntity;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

public interface ProductService {

    ProductEntity createProduct(ProductEntity productEntity);

    ProductEntity updateProduct(ProductEntity productEntity);

    List<ProductEntity> searchProducts();

    Optional<ProductEntity> getProductById(UUID id);

    long countProducts();

    CategoryEntity saveOrUpdateCategory(CategoryEntity categoryEntity);

    List<CategoryEntity> getCategories();

    List<CategoryEntity> getCategories(Pageable page);

    Set<CategoryEntity> searchCategoriesByCategoriesID(Set<UUID> categoriesID);

}
