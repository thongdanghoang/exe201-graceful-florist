package id.vn.thongdanghoang.graceful.dtos.orders;

import id.vn.thongdanghoang.graceful.enums.OrderStatus;

public record OrderCriteriaDto(
        OrderStatus status
) {
}
