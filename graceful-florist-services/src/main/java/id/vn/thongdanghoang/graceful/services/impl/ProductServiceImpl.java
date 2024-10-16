package id.vn.thongdanghoang.graceful.services.impl;

import id.vn.thongdanghoang.graceful.dtos.products.CategoryCriteriaDto;
import id.vn.thongdanghoang.graceful.dtos.products.CategoryDTO;
import id.vn.thongdanghoang.graceful.dtos.products.ProductCriteria;
import id.vn.thongdanghoang.graceful.entities.CategoryEntity;
import id.vn.thongdanghoang.graceful.entities.IngredientEntity;
import id.vn.thongdanghoang.graceful.entities.ProductEntity;
import id.vn.thongdanghoang.graceful.enums.CategoryType;
import id.vn.thongdanghoang.graceful.enums.ProductStatus;
import id.vn.thongdanghoang.graceful.repositories.CategoryRepository;
import id.vn.thongdanghoang.graceful.repositories.IngredientRepository;
import id.vn.thongdanghoang.graceful.repositories.ProductRepository;
import id.vn.thongdanghoang.graceful.securities.SecurityUser;
import id.vn.thongdanghoang.graceful.services.ProductService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

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
    public Page<ProductEntity> searchProducts(ProductCriteria criteria, Pageable page) {
        var securityUser = (SecurityUser) SecurityContextHolder
                .getContext().getAuthentication().getPrincipal();
        var categories = criteria
                .categories().stream()
                .map(CategoryDTO::getId)
                .collect(Collectors.toSet());
        if (categories.isEmpty()) {
            categories = null;
        }
        var keyword = Optional
                .ofNullable(criteria.keyword())
                .orElse(StringUtils.EMPTY)
                .replace(" ", " & ")
                .toLowerCase();
        if (StringUtils.isBlank(keyword)) {
            keyword = null;
        }
        var categoryType = criteria.categoryType();
        var fromInclusive = criteria.fromInclusive();
        var isAdmin = securityUser
                .getAuthorities().stream()
                .map(Object::toString)
                .anyMatch("ROLE_ADMIN"::equalsIgnoreCase);
        if (Objects.isNull(criteria.status())) {
            return repository.searchProduct(categories, keyword, categoryType, fromInclusive, isAdmin, page);
        }
        boolean enable = !isAdmin || criteria.status() == ProductStatus.SELLING;
        return repository.searchProduct(categories, keyword, categoryType, fromInclusive, enable, isAdmin, page);
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
    public Page<CategoryEntity> getEnabledCategories(CategoryCriteriaDto searchCriteria, Pageable page) {
        var type = searchCriteria.type();
        var enabled = searchCriteria.enabled();
        return categoryRepository.searchCategory(type, enabled, page);
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

    @Override
    public List<String> getSuggestions(String keyword) {
        String formattedKeyword = keyword.replace(" ", " & ");
        if (StringUtils.isBlank(formattedKeyword)) {
            return List.of();
        }
        return repository.fullTextSearch(formattedKeyword);
    }
}
