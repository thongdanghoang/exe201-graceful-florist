package id.vn.thongdanghoang.graceful.dtos.orders;


import id.vn.thongdanghoang.graceful.dtos.AbstractBaseDTO;
import id.vn.thongdanghoang.graceful.dtos.products.ProductDTO;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class OrderItemDTO extends AbstractBaseDTO {

    @NotNull
    private ProductDTO product;

    @NotNull
    private int quantity;

    @NotNull
    private int price;

    @NotNull
    private int totalPrice;
}
