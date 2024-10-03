package id.vn.thongdanghoang.graceful.services.impl;

import id.vn.thongdanghoang.graceful.entities.ProductEntity;
import id.vn.thongdanghoang.graceful.repositories.ProductRepository;
import id.vn.thongdanghoang.graceful.services.ProductService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional(rollbackOn = Throwable.class)
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService{

    private final ProductRepository repository;

    @Override
    public ProductEntity createProduct(ProductEntity productEntity) {
        return repository.save(productEntity);
    }

    @Override
    public ProductEntity updateProduct(ProductEntity productEntity) {
        return repository.save(productEntity);
    }

    @Override
    public List<ProductEntity> searchProducts() {
        return repository.findAll();
    }

    @Override
    public Optional<ProductEntity> getProductById(UUID id) {
        return repository.findById(id);
    }

    @Override
    public long countProducts() {
        return repository.count();
    }
}
