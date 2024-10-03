package id.vn.thongdanghoang.graceful.services;

import id.vn.thongdanghoang.graceful.entities.ProductEntity;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ProductService {

    ProductEntity createProduct(ProductEntity productEntity);

    ProductEntity updateProduct(ProductEntity productEntity);

    List<ProductEntity> searchProducts();

    Optional<ProductEntity> getProductById(UUID id);

    long countProducts();

}
