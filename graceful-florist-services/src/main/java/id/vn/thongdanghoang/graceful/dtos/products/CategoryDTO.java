package id.vn.thongdanghoang.graceful.dtos.products;

import id.vn.thongdanghoang.graceful.dtos.AbstractAuditableDTO;
import id.vn.thongdanghoang.graceful.enums.CategoryType;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CategoryDTO extends AbstractAuditableDTO {

    @NotNull
    private CategoryType type;

    @NotNull
    private String name;

    private boolean enabled;
}
