package id.vn.thongdanghoang.graceful.dtos.products;

import id.vn.thongdanghoang.graceful.dtos.AbstractBaseDTO;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class ProductCustomPriceDto extends AbstractBaseDTO {

    @NotNull
    private String name;

    @NotNull
    private int price;

}
