package id.vn.thongdanghoang.graceful.web;

import id.vn.thongdanghoang.graceful.dtos.SearchCriteriaDto;
import id.vn.thongdanghoang.graceful.dtos.SearchResultDto;
import id.vn.thongdanghoang.graceful.dtos.products.CategoryDTO;
import id.vn.thongdanghoang.graceful.dtos.products.ProductCriteria;
import id.vn.thongdanghoang.graceful.dtos.products.ProductDTO;
import id.vn.thongdanghoang.graceful.entities.CategoryEntity;
import id.vn.thongdanghoang.graceful.mappers.CommonMapper;
import id.vn.thongdanghoang.graceful.mappers.ProductMapper;
import id.vn.thongdanghoang.graceful.securities.SecurityUser;
import id.vn.thongdanghoang.graceful.services.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
public class ProductController {

    private final ProductService service;
    private final ProductMapper mapper;
    private final CommonMapper commonMapper;

    @PostMapping("/search")
    public ResponseEntity<SearchResultDto<ProductDTO>> searchProducts(@RequestBody SearchCriteriaDto<ProductCriteria> searchCriteria) {
        var categories = searchCriteria.getCriteria()
                .categories().stream()
                .map(CategoryDTO::getId)
                .collect(Collectors.toSet());
        var pageable = commonMapper
                .toPageable(searchCriteria.getPage(), searchCriteria.getSort());
        var productEntities = service
                .searchProducts(categories, pageable);
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
        var productEntity = mapper.toProductEntity(productDTO);
        var createdProductEntity = service.createProduct(productEntity);
        var createdProductDTO = mapper.toProductDTO(createdProductEntity);
        return ResponseEntity.ok(createdProductDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductDTO> updateProduct(@PathVariable UUID id,
                                                    @RequestBody ProductDTO productDTO) {
        var product = service.getProductById(id);
        if (product.isPresent()) {
            var productEntity = mapper.toProductEntity(productDTO, product.get());
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
    public ResponseEntity<SearchResultDto<CategoryDTO>> searchCategories(@RequestBody SearchCriteriaDto<Void> searchCriteria) {
        var categoryEntities = service
                .getEnabledCategories(commonMapper.toPageable(searchCriteria.getPage(), searchCriteria.getSort()));
        var categoryDTOs = categoryEntities.stream()
                .map(mapper::toCategoryDTO)
                .toList();
        var categoriesSearchResult = SearchResultDto
                .of(categoryDTOs, categoryDTOs.size());
        return ResponseEntity.ok(categoriesSearchResult);
    }

    @PostMapping("/categories")
    public ResponseEntity<CategoryDTO> saveOrUpdateCategory(@RequestBody @Valid CategoryDTO category) {
        CategoryEntity categoryEntity = service
                .saveOrUpdateCategory(mapper.toCategoryEntity(category));
        return ResponseEntity.ok(
                mapper.toCategoryDTO(categoryEntity));
    }

}
