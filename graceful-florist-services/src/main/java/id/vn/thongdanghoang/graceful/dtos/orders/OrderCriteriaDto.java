package id.vn.thongdanghoang.graceful.dtos.orders;

import id.vn.thongdanghoang.graceful.enums.OrderStatus;
import id.vn.thongdanghoang.graceful.enums.OrderType;

import java.time.LocalDateTime;

public record OrderCriteriaDto(
        OrderStatus status,
        LocalDateTime fromInclusive,
        OrderType orderType
) {
}
