package id.vn.thongdanghoang.graceful.dtos.carts;

import id.vn.thongdanghoang.graceful.dtos.products.ProductDTO;
import jakarta.validation.constraints.NotNull;

public record CartItemDTO(
        @NotNull ProductDTO product,
        @NotNull int quantity
) {
}
