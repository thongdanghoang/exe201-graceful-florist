package id.vn.thongdanghoang.graceful.mappers;

import id.vn.thongdanghoang.graceful.dtos.products.CategoryDTO;
import id.vn.thongdanghoang.graceful.dtos.products.CommentDto;
import id.vn.thongdanghoang.graceful.dtos.products.IngredientDTO;
import id.vn.thongdanghoang.graceful.dtos.products.ProductDTO;
import id.vn.thongdanghoang.graceful.entities.OrderRatingEntity;
import id.vn.thongdanghoang.graceful.entities.ProductEntity;
import id.vn.thongdanghoang.graceful.entities.ProductIngredientEntity;
import id.vn.thongdanghoang.graceful.repositories.CategoryRepository;
import id.vn.thongdanghoang.graceful.repositories.IngredientRepository;
import id.vn.thongdanghoang.graceful.utils.JpaUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.Objects;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public abstract class ProductMapperDecorator implements ProductMapper {

    @Autowired
    @Qualifier("delegate")
    private ProductMapper delegate;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private IngredientRepository ingredientRepository;

    @Autowired
    private IngredientMapper ingredientMapper;

    @Autowired
    private UserMapper userMapper;

    @Override
    public ProductEntity updateProduct(ProductDTO productDTO, ProductEntity productEntity) {
        var productDelegated = delegate.updateProduct(productDTO, productEntity);
        setCategories(productDelegated, productDTO);
        setIngredients(productDelegated, productDTO);
        return productDelegated;
    }

    @Override
    public ProductEntity createProduct(ProductDTO productDTO) {
        var productDelegated = delegate.createProduct(productDTO);
        setCategories(productDelegated, productDTO);
        setIngredients(productDelegated, productDTO);
        return productDelegated;
    }

    private void setCategories(ProductEntity productEntity, ProductDTO productDTO) {
        if (Objects.nonNull(productDTO.getCategories()) && !productDTO.getCategories().isEmpty()) {
            productEntity.setCategories(
                    categoryRepository.findAllById(
                            productDTO.getCategories().stream()
                                    .map(CategoryDTO::getId)
                                    .collect(Collectors.toSet())));
        }
    }

    private void setIngredients(ProductEntity productEntity, ProductDTO productDTO) {
        if (Objects.nonNull(productDTO.getIngredients()) && !productDTO.getIngredients().isEmpty()) {
            Map<UUID, Integer> ingredients = productDTO
                    .getIngredients().stream()
                    .collect(Collectors.toMap(IngredientDTO::getId, IngredientDTO::getQuantity));
            var productIngredientEntities = ingredientRepository
                    .findAllById(ingredients.keySet())
                    .stream().map(ingredient -> {
                        var productIngredient = this.toProductIngredientEntity(ingredient, productEntity);
                        productIngredient.setQuantity(ingredients.get(ingredient.getId()));
                        return productIngredient;
                    })
                    .collect(Collectors.toSet());
            productEntity.setIngredients(productIngredientEntities);
        }
    }

    @Override
    public ProductDTO toProductDTO(ProductEntity productEntity) {
        var productDTO = delegate.toProductDTO(productEntity);
        if (JpaUtils.isInitialized(productEntity.getCategories())) {
            productDTO.setCategories(
                    productEntity
                            .getCategories().stream()
                            .map(this::toCategoryDTO)
                            .collect(Collectors.toSet()));
        }
        if (JpaUtils.isInitialized(productEntity.getIngredients())) {
            Map<UUID, Integer> ingredients = productEntity
                    .getIngredients().stream()
                    .collect(Collectors.toMap(
                            productIngredientEntity -> productIngredientEntity.getIngredient().getId(),
                            ProductIngredientEntity::getQuantity));
            productDTO.setIngredients(
                    productEntity
                            .getIngredients().stream()
                            .map(ProductIngredientEntity::getIngredient)
                            .map(ingredientMapper::toIngredientDTO)
                            .peek(ingredientDTO -> ingredientDTO.setQuantity(ingredients.get(ingredientDTO.getId())))
                            .collect(Collectors.toSet()));
        }
        if (Objects.nonNull(productEntity.getOwner())) {
            productDTO.setOwner(userMapper.toUserDto(productEntity.getOwner()));
        }
        if (Objects.nonNull(productEntity.getCustomPrice())) {
            productDTO.setCustomPrice(delegate.toProductCustomPriceDto(productEntity.getCustomPrice()));
        }
        return productDTO;
    }

    @Override
    public CommentDto toCommentDto(OrderRatingEntity orderRatingEntity) {
        var commentDto = delegate.toCommentDto(orderRatingEntity);
        commentDto.setUserDTO(userMapper.toUserDto(orderRatingEntity.getUser()));
        if (commentDto.isAnonymous()) {
            commentDto.getUserDTO().setFirstName("*****");
            commentDto.getUserDTO().setLastName("***** ***");
        }
        return commentDto;
    }
}
