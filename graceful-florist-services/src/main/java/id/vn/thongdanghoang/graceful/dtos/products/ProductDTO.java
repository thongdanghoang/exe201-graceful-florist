package id.vn.thongdanghoang.graceful.dtos.products;

import id.vn.thongdanghoang.graceful.dtos.AbstractAuditableDTO;
import lombok.Data;

import java.util.Set;
import java.util.UUID;

@Data
public class ProductDTO extends AbstractAuditableDTO {
    private Set<UUID> images;
    private UUID mainImage;
    private String name;
    private String description;
    private int price;
    private boolean enabled;
    private Set<CategoryDTO> categories;
    private Set<IngredientDTO> ingredients;
}
