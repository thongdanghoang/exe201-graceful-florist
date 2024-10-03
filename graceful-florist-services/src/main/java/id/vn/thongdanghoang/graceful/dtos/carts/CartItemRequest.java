package id.vn.thongdanghoang.graceful.dtos.carts;

import id.vn.thongdanghoang.graceful.dtos.AbstractBaseDTO;

public record CartItemRequest(
        AbstractBaseDTO product,
        int quantity
) {
}
