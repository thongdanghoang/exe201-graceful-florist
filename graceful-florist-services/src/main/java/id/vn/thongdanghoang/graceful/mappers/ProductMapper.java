package id.vn.thongdanghoang.graceful.mappers;

import id.vn.thongdanghoang.graceful.dtos.products.CategoryDTO;
import id.vn.thongdanghoang.graceful.dtos.products.ProductDTO;
import id.vn.thongdanghoang.graceful.entities.CategoryEntity;
import id.vn.thongdanghoang.graceful.entities.IngredientEntity;
import id.vn.thongdanghoang.graceful.entities.ProductEntity;
import id.vn.thongdanghoang.graceful.entities.ProductIngredientEntity;
import org.apache.commons.lang3.StringUtils;
import org.mapstruct.*;

import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING, unmappedTargetPolicy = ReportingPolicy.IGNORE)
@DecoratedWith(ProductMapperDecorator.class)
public interface ProductMapper {

    @Mapping(target = "categories", ignore = true)
    @Mapping(target = "ingredients", ignore = true)
    @Mapping(target = "owner", ignore = true)
    @Mapping(target = "images", source = "images", qualifiedByName = "toImageIDs")
    ProductDTO toProductDTO(ProductEntity productEntity);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "categories", ignore = true)
    @Mapping(target = "ingredients", ignore = true)
    @Mapping(target = "owner", ignore = true)
    @Mapping(target = "images", source = "images", qualifiedByName = "toImages")
    ProductEntity createProduct(ProductDTO productDTO);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "categories", ignore = true)
    @Mapping(target = "ingredients", ignore = true)
    @Mapping(target = "owner", ignore = true)
    @Mapping(target = "images", source = "images", qualifiedByName = "toImages")
    ProductEntity updateProduct(ProductDTO productDTO, @MappingTarget ProductEntity productEntity);

    CategoryDTO toCategoryDTO(CategoryEntity categoryEntity);

    CategoryEntity toCategoryEntity(CategoryDTO categoryDTO);

    List<ProductDTO> toProductDTOs(List<ProductEntity> productEntities);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "version", ignore = true)
    @Mapping(target = "transientHashCodeLeaked", ignore = true)
    @Mapping(target = "product", source = "productEntity")
    @Mapping(target = "ingredient", source = "ingredientEntity")
    ProductIngredientEntity toProductIngredientEntity(IngredientEntity ingredientEntity, ProductEntity productEntity);

    @Named("toImageIDs")
    default Set<UUID> toImageIDs(String images) {
        if (StringUtils.isBlank(images)) {
            return Set.of();
        }
        return Arrays.stream(images.split(","))
                .map(UUID::fromString)
                .collect(Collectors.toSet());
    }

    @Named("toImages")
    default String toImages(Set<UUID> imageIDs) {
        if (imageIDs == null || imageIDs.isEmpty()) {
            return StringUtils.EMPTY;
        }
        return imageIDs.stream()
                .map(UUID::toString)
                .collect(Collectors.joining(","));
    }
}
