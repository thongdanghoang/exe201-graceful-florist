package id.vn.thongdanghoang.graceful.web;

import id.vn.thongdanghoang.graceful.dtos.images.UploadImageResponse;
import id.vn.thongdanghoang.graceful.dtos.products.IngredientDTO;
import id.vn.thongdanghoang.graceful.dtos.products.ProductDTO;
import id.vn.thongdanghoang.graceful.entities.IngredientEntity;
import id.vn.thongdanghoang.graceful.entities.ProductEntity;
import id.vn.thongdanghoang.graceful.enums.IngredientType;
import id.vn.thongdanghoang.graceful.mappers.IngredientMapper;
import id.vn.thongdanghoang.graceful.mappers.ProductMapper;
import id.vn.thongdanghoang.graceful.services.ProductService;
import id.vn.thongdanghoang.graceful.services.StorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@RequestMapping("/api/images")
@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
public class ImageController {
    private final StorageService storageService;
    private final ProductService productService;
    private final ProductMapper proma;

    @PostMapping()
    public ResponseEntity<UploadImageResponse> uploadImage(@RequestParam("file") MultipartFile file) {
        try (InputStream inputStream = file.getInputStream()) {
            var imageId = storageService.uploadFile(inputStream, file.getContentType());
            return new ResponseEntity<>(new UploadImageResponse(imageId), HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/multiple")
    public ResponseEntity<List<ProductDTO>> uploadImages(@RequestParam("files") MultipartFile[] files) {
        List<ProductDTO> responses = new ArrayList<>();
        for (MultipartFile file : files) {
            try (InputStream inputStream = file.getInputStream()) {
                // image original file name is 31.Hoa tốt nghiệp kiểu tròn tông pastel.jpg -> Hoa tốt nghiệp kiểu tròn tông pastel
                var imageId = storageService.uploadFile(inputStream, file.getContentType());
                var product = new ProductEntity();
                product.setMainImage(imageId);
                product.setPrice(0);
                product.setEnabled(true);
                product.setName(Objects.requireNonNull(file.getOriginalFilename()).split("\\.")[1]);
                productService.createProduct(product);
                responses.add(proma.toProductDTO(product));
            } catch (Exception e) {
                return ResponseEntity.badRequest().build();
            }
        }
        return new ResponseEntity<>(responses, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<byte[]> downloadImage(@PathVariable("id") String imageId) {
        try (InputStream inputStream = storageService.getFile(imageId)) {
            byte[] bytes = inputStream.readAllBytes();
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_JPEG) // Adjust the content type as needed
                    .body(bytes);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
