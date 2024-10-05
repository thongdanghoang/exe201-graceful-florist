package id.vn.thongdanghoang.graceful.dtos.products;

import id.vn.thongdanghoang.graceful.dtos.AbstractAuditableDTO;
import id.vn.thongdanghoang.graceful.enums.IngredientType;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.UUID;

@Data
public class IngredientDTO extends AbstractAuditableDTO {
    @NotNull
    private String name;

    @NotNull
    private UUID image;

    @NotNull
    private IngredientType type;
}
