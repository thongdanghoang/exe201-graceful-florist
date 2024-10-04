package id.vn.thongdanghoang.graceful.web;

import id.vn.thongdanghoang.graceful.dtos.SearchResultDto;
import id.vn.thongdanghoang.graceful.dtos.products.ProductDTO;
import id.vn.thongdanghoang.graceful.mappers.ProductMapper;
import id.vn.thongdanghoang.graceful.services.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
public class ProductController {

    private final ProductService service;
    private final ProductMapper mapper;

    @GetMapping
    public ResponseEntity<SearchResultDto<ProductDTO>> searchProducts() {
        var productEntities = service.searchProducts();
        var productsSearchResult = SearchResultDto
                .of(mapper.toProductDTOs(productEntities), service.countProducts());
        return ResponseEntity.ok(productsSearchResult);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable UUID id) {
        var productEntity = service.getProductById(id);
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
        if(product.isPresent()){
            var productEntity = mapper.toProductEntity(productDTO, product.get());
            var updatedProductEntity = service.updateProduct(productEntity);
            var updatedProductDTO = mapper.toProductDTO(updatedProductEntity);
            return ResponseEntity.ok(updatedProductDTO);
        }
        return ResponseEntity.notFound().build();
    }

}
