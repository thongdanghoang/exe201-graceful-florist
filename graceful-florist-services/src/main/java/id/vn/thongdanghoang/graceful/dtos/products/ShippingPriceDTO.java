package id.vn.thongdanghoang.graceful.dtos.products;

import id.vn.thongdanghoang.graceful.dtos.AbstractAuditableDTO;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class ShippingPriceDTO extends AbstractAuditableDTO {

    @NotNull
    private int price;

    @NotNull
    private String name;

}
