package id.vn.thongdanghoang.graceful.mappers;

import id.vn.thongdanghoang.graceful.dtos.products.IngredientDTO;
import id.vn.thongdanghoang.graceful.entities.IngredientEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING, unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface IngredientMapper {

    IngredientDTO toIngredientDTO(IngredientEntity ingredientEntity);

}
