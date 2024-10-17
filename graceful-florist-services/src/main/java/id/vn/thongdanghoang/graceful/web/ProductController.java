package id.vn.thongdanghoang.graceful.web;

import id.vn.thongdanghoang.graceful.dtos.SearchCriteriaDto;
import id.vn.thongdanghoang.graceful.dtos.SearchResultDto;
import id.vn.thongdanghoang.graceful.dtos.products.*;
import id.vn.thongdanghoang.graceful.entities.CartItemEntity;
import id.vn.thongdanghoang.graceful.entities.CategoryEntity;
import id.vn.thongdanghoang.graceful.enums.IngredientType;
import id.vn.thongdanghoang.graceful.mappers.CommonMapper;
import id.vn.thongdanghoang.graceful.mappers.IngredientMapper;
import id.vn.thongdanghoang.graceful.mappers.ProductMapper;
import id.vn.thongdanghoang.graceful.securities.SecurityUser;
import id.vn.thongdanghoang.graceful.services.CartService;
import id.vn.thongdanghoang.graceful.services.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RequestMapping("/products")
@RestController
@RequiredArgsConstructor
public class ProductController {

    private final ProductService service;
    private final CartService cartService;
    private final ProductMapper mapper;
    private final IngredientMapper ingredientMapper;
    private final CommonMapper commonMapper;

    @GetMapping("/suggestions")
    public ResponseEntity<List<String>> getSuggestions(@RequestParam String keyword) {
        return ResponseEntity.ok(service.getSuggestions(keyword));
    }

    @PostMapping("/search")
    public ResponseEntity<SearchResultDto<ProductDTO>> searchProducts(@RequestBody SearchCriteriaDto<ProductCriteria> searchCriteria) {
        var pageable = commonMapper
                .toPageable(searchCriteria.getPage(), searchCriteria.getSort());
        var productEntities = service
                .searchProducts(searchCriteria.getCriteria(), pageable);
        var productsSearchResult = SearchResultDto
                .of(mapper.toProductDTOs(productEntities.toList()), productEntities.getTotalElements());
        return ResponseEntity.ok(productsSearchResult);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable UUID id) {
        var productEntity = service
                .getProductById(id);
        if (productEntity.isPresent()) {
            var productDTO = mapper.toProductDTO(productEntity.get());
            return ResponseEntity.ok(productDTO);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<ProductDTO> createProduct(@RequestBody ProductDTO productDTO) {
        var productEntity = mapper.createProduct(productDTO);
        var createdProductEntity = service.createProduct(productEntity);
        var createdProductDTO = mapper.toProductDTO(createdProductEntity);
        return ResponseEntity.ok(createdProductDTO);
    }

    @PostMapping("/custom")
    public ResponseEntity<ProductDTO> createCustomProduct(@RequestBody ProductDTO productDTO) {
        var securityUser = (SecurityUser) SecurityContextHolder
                .getContext().getAuthentication().getPrincipal();
        productDTO.setName("Flower Customized " + System.currentTimeMillis());
        productDTO.setEnabled(true);
        productDTO.getIngredients().stream()
                .filter(ingredientDTO -> ingredientDTO.getImage() != null)
                .filter(ingredientDTO -> ingredientDTO.getType() == IngredientType.MAIN_FLOWER)
                .findAny()
                .ifPresent(ingredientDTO -> productDTO.setMainImage(ingredientDTO.getImage()));
        int price = productDTO.getIngredients().stream()
                .map(ingredientDTO -> ingredientDTO.getPrice() * ingredientDTO.getQuantity())
                .reduce(Integer::sum)
                .orElseThrow();
        price += productDTO.getCustomPrice().getPrice();
        var productEntity = mapper.createProduct(productDTO);
        productEntity.setOwner(securityUser.getUserEntity());
        productEntity.setPrice(price);
        productEntity.setQuantity(1L);
        var createdProductEntity = service.createProduct(productEntity);
        CartItemEntity cartItemEntity = new CartItemEntity();
        cartItemEntity.setProduct(createdProductEntity);
        cartItemEntity.setUser(securityUser.getUserEntity());
        cartItemEntity.setQuantity(1);
        cartService.saveOrUpdate(cartItemEntity);
        var createdProductDTO = mapper.toProductDTO(createdProductEntity);
        return ResponseEntity.ok(createdProductDTO);
    }

    @GetMapping("/custom-prices")
    public ResponseEntity<List<ProductCustomPriceDto>> getCustomPrices() {
        var productCustomPrices = service
                .getProductCustomPrices()
                .stream()
                .map(mapper::toProductCustomPriceDto)
                .toList();
        return ResponseEntity.ok(productCustomPrices);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductDTO> updateProduct(@PathVariable UUID id,
                                                    @RequestBody ProductDTO productDTO) {
        var product = service.getProductById(id);
        if (product.isPresent()) {
            var productEntity = mapper.updateProduct(productDTO, product.get());
            var updatedProductEntity = service.updateProduct(productEntity);
            var updatedProductDTO = mapper.toProductDTO(updatedProductEntity);
            return ResponseEntity.ok(updatedProductDTO);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/categories")
    public ResponseEntity<List<CategoryDTO>> getCategoriesOverview() {
        var categoryDTOs = service
                .getEnabledCategories().stream()
                .map(mapper::toCategoryDTO)
                .toList();
        return ResponseEntity.ok(categoryDTOs);
    }

    @PostMapping("/categories/search")
    public ResponseEntity<SearchResultDto<CategoryDTO>> searchCategories(@RequestBody SearchCriteriaDto<CategoryCriteriaDto> searchCriteria) {
        var pageable = commonMapper
                .toPageable(searchCriteria.getPage(), searchCriteria.getSort());
        var categoryEntities = service
                .getEnabledCategories(searchCriteria.getCriteria(), pageable);
        var categoryDTOs = categoryEntities.stream()
                .map(mapper::toCategoryDTO)
                .toList();
        var categoriesSearchResult = SearchResultDto
                .of(categoryDTOs, categoryEntities.getTotalElements());
        return ResponseEntity.ok(categoriesSearchResult);
    }

    @PostMapping("/categories")
    public ResponseEntity<CategoryDTO> saveOrUpdateCategory(@RequestBody @Valid CategoryDTO category) {
        CategoryEntity categoryEntity = service
                .saveOrUpdateCategory(mapper.toCategoryEntity(category));
        return ResponseEntity.ok(
                mapper.toCategoryDTO(categoryEntity));
    }

    @GetMapping("/ingredients")
    public ResponseEntity<List<IngredientDTO>> getIngredients() {
        var ingredientDTOs = service
                .getIngredients().stream()
                .map(ingredientMapper::toIngredientDTO)
                .toList();
        return ResponseEntity.ok(ingredientDTOs);
    }

    @PostMapping("/comments/search")
    public ResponseEntity<SearchResultDto<CommentDto>> searchComment(@RequestBody SearchCriteriaDto<CommentCriteriaDTO> searchCriteria) {
        var pageable = commonMapper
                .toPageable(searchCriteria.getPage(), searchCriteria.getSort());
        var orderRatingEntities = service
                .searchComment(searchCriteria.getCriteria().productId(), pageable);
        var commentDTOs = orderRatingEntities.stream()
                .map(mapper::toCommentDto)
                .toList();
        var comments = SearchResultDto
                .of(commentDTOs, orderRatingEntities.getTotalElements());
        return ResponseEntity.ok(comments);
    }

}
