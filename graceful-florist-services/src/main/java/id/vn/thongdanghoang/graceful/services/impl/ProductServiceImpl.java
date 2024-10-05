package id.vn.thongdanghoang.graceful.services.impl;

import id.vn.thongdanghoang.graceful.entities.CategoryEntity;
import id.vn.thongdanghoang.graceful.entities.ProductEntity;
import id.vn.thongdanghoang.graceful.repositories.CategoryRepository;
import id.vn.thongdanghoang.graceful.repositories.ProductRepository;
import id.vn.thongdanghoang.graceful.services.ProductService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Transactional(rollbackOn = Throwable.class)
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService{

    private final ProductRepository repository;
    private final CategoryRepository categoryRepository;

    @Override
    public ProductEntity createProduct(ProductEntity productEntity) {
        return repository.save(productEntity);
    }

    @Override
    public ProductEntity updateProduct(ProductEntity productEntity) {
        return repository.save(productEntity);
    }

    @Override
    public Page<ProductEntity> searchProducts(Pageable page) {
        return repository.findAll(page);
    }

    @Override
    public Optional<ProductEntity> getProductById(UUID id) {
        return repository.findByIdWithDetail(id);
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
    public List<CategoryEntity> getEnabledCategories(Pageable page) {
        return categoryRepository.findAll();
    }

    @Override
    public Set<CategoryEntity> searchCategoriesByCategoriesID(Set<UUID> categoriesID) {
        return Set.of();
    }
}
