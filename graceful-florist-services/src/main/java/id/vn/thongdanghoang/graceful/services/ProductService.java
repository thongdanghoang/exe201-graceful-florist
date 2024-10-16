package id.vn.thongdanghoang.graceful.services;

import id.vn.thongdanghoang.graceful.dtos.products.CategoryCriteriaDto;
import id.vn.thongdanghoang.graceful.dtos.products.ProductCriteria;
import id.vn.thongdanghoang.graceful.entities.*;
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

    Page<ProductEntity> searchProducts(ProductCriteria criteria, Pageable page);

    CategoryEntity saveOrUpdateCategory(CategoryEntity categoryEntity);

    List<CategoryEntity> getEnabledCategories();

    Page<CategoryEntity> getEnabledCategories(CategoryCriteriaDto searchCriteria, Pageable page);

    Set<CategoryEntity> searchCategoriesByCategoriesID(Set<UUID> categoriesID);

    void addIngredient(IngredientEntity ingredientEntity);

    List<IngredientEntity> getIngredients();

    List<String> getSuggestions(String keyword);

    List<ProductCustomPriceEntity> getProductCustomPrices();
}
