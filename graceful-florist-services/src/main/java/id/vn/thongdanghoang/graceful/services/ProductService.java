package id.vn.thongdanghoang.graceful.services;

import id.vn.thongdanghoang.graceful.entities.CategoryEntity;
import id.vn.thongdanghoang.graceful.entities.IngredientEntity;
import id.vn.thongdanghoang.graceful.entities.ProductEntity;
import id.vn.thongdanghoang.graceful.entities.UserEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

public interface ProductService {

    ProductEntity createProduct(ProductEntity productEntity);

    ProductEntity updateProduct(ProductEntity productEntity);

    Optional<ProductEntity> getProductById(UUID id);

    Page<ProductEntity> searchProducts(Set<UUID> categories, Pageable page, UserEntity user);

    CategoryEntity saveOrUpdateCategory(CategoryEntity categoryEntity);

    List<CategoryEntity> getEnabledCategories();

    Page<CategoryEntity> getEnabledCategories(Pageable page);

    Set<CategoryEntity> searchCategoriesByCategoriesID(Set<UUID> categoriesID);

    IngredientEntity addIngredient(IngredientEntity ingredientEntity);

    List<IngredientEntity> getIngredients();
}
