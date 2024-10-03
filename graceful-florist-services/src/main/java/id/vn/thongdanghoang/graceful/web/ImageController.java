package id.vn.thongdanghoang.graceful.web;

import id.vn.thongdanghoang.graceful.dtos.images.UploadImageResponse;
import id.vn.thongdanghoang.graceful.services.StorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;

@RequestMapping("/api/images")
@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
public class ImageController {
    private final StorageService storageService;

    @PostMapping()
    public ResponseEntity<UploadImageResponse> uploadImage(@RequestParam("file") MultipartFile file) {
        try (InputStream inputStream = file.getInputStream()) {
            var imageId = storageService.uploadFile(inputStream, file.getContentType());
            return new ResponseEntity<>(new UploadImageResponse(imageId), HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
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
