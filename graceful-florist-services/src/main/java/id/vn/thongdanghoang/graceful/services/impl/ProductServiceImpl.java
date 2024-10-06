package id.vn.thongdanghoang.graceful.services.impl;

import id.vn.thongdanghoang.graceful.entities.CategoryEntity;
import id.vn.thongdanghoang.graceful.entities.IngredientEntity;
import id.vn.thongdanghoang.graceful.entities.ProductEntity;
import id.vn.thongdanghoang.graceful.repositories.CategoryRepository;
import id.vn.thongdanghoang.graceful.repositories.IngredientRepository;
import id.vn.thongdanghoang.graceful.repositories.ProductRepository;
import id.vn.thongdanghoang.graceful.securities.SecurityUser;
import id.vn.thongdanghoang.graceful.services.ProductService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Transactional(rollbackOn = Throwable.class)
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository repository;
    private final CategoryRepository categoryRepository;
    private final IngredientRepository ingredientRepository;

    @Override
    public ProductEntity createProduct(ProductEntity productEntity) {
        return repository.save(productEntity);
    }

    @Override
    public ProductEntity updateProduct(ProductEntity productEntity) {
        return repository.save(productEntity);
    }

    @Override
    public Optional<ProductEntity> getProductById(UUID id) {
        return repository.findByIdWithDetail(id);
    }

    @Override
    public Page<ProductEntity> searchProducts(Set<UUID> categories, Pageable page) {
        var securityUser = (SecurityUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        boolean isAdmin = securityUser.getAuthorities().stream().map(Object::toString).anyMatch("ROLE_ADMIN"::equals);
        if (isAdmin) {
            if (categories.isEmpty()) {
                return repository.findAll(page);
            }
            return repository.searchByCategories(categories, page);
        }
        if (categories.isEmpty()) {
            return repository.findAllByEnabledTrue(page);
        }
        return repository.searchEnabledByCategories(categories, page);
    }

    @Override
    public CategoryEntity saveOrUpdateCategory(CategoryEntity categoryEntity) {
        return categoryRepository.save(categoryEntity);
    }

    @Override
    public List<CategoryEntity> getEnabledCategories() {
        return categoryRepository.findEnabledCategories();
    }

    @Override
    public Page<CategoryEntity> getEnabledCategories(Pageable page) {
        return categoryRepository.findAll(page);
    }

    @Override
    public Set<CategoryEntity> searchCategoriesByCategoriesID(Set<UUID> categoriesID) {
        return Set.of();
    }

    @Override
    public IngredientEntity addIngredient(IngredientEntity ingredientEntity) {
        return ingredientRepository.save(ingredientEntity);
    }

    @Override
    public List<IngredientEntity> getIngredients() {
        return ingredientRepository.findAll();
    }
}
