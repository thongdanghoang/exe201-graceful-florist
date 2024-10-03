package id.vn.thongdanghoang.graceful.mappers;

import id.vn.thongdanghoang.graceful.dtos.products.ProductDTO;
import id.vn.thongdanghoang.graceful.entities.ProductEntity;
import org.apache.commons.lang3.StringUtils;
import org.mapstruct.*;

import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING, unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ProductMapper {

    @Mapping(target = "images", source = "images", qualifiedByName = "toImageIDs")
    ProductDTO toProductDto(ProductEntity productEntity);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "images", source = "images", qualifiedByName = "toImages")
    ProductEntity toProductEntity(ProductDTO productDTO);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "images", source = "images", qualifiedByName = "toImages")
    ProductEntity toProductEntity(ProductDTO productDTO, @MappingTarget ProductEntity productEntity);

    List<ProductDTO> toProductDTOs(List<ProductEntity> productEntities);

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
