package id.vn.thongdanghoang.graceful.mappers;

import id.vn.thongdanghoang.graceful.dtos.products.CategoryDTO;
import id.vn.thongdanghoang.graceful.dtos.products.ProductDTO;
import id.vn.thongdanghoang.graceful.entities.ProductEntity;
import id.vn.thongdanghoang.graceful.repositories.CategoryRepository;
import id.vn.thongdanghoang.graceful.utils.JpaUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import java.util.Objects;
import java.util.stream.Collectors;

@Component
public abstract class ProductMapperDecorator implements ProductMapper {

    @Autowired
    @Qualifier("delegate")
    private ProductMapper delegate;

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public ProductEntity toProductEntity(ProductDTO productDTO, ProductEntity productEntity) {
        var productDelegated = delegate.toProductEntity(productDTO, productEntity);
        if(Objects.nonNull(productDTO.getCategories()) && !productDTO.getCategories().isEmpty()) {
            productDelegated.setCategories(
                    categoryRepository.findAllById(
                            productDTO.getCategories().stream()
                                    .map(CategoryDTO::getId)
                                    .collect(Collectors.toSet())));
        }
        return productDelegated;
    }

    @Override
    public ProductEntity toProductEntity(ProductDTO productDTO) {
        var productEntity = delegate.toProductEntity(productDTO);
        if(Objects.nonNull(productDTO.getCategories()) && !productDTO.getCategories().isEmpty()) {
            productEntity.setCategories(
                    categoryRepository.findAllById(
                            productDTO.getCategories().stream()
                                    .map(CategoryDTO::getId)
                                    .collect(Collectors.toSet())));
        }
        return productEntity;
    }

    @Override
    public ProductDTO toProductDTO(ProductEntity productEntity) {
        var productDTO = delegate.toProductDTO(productEntity);
        if(JpaUtils.isInitialized(productEntity.getCategories())) {
            productDTO.setCategories(
                    productEntity
                            .getCategories().stream()
                            .map(this::toCategoryDTO)
                            .collect(Collectors.toSet()));
        }
        return productDTO;
    }
}
