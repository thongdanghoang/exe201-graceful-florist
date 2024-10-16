package id.vn.thongdanghoang.graceful.dtos.products;

import id.vn.thongdanghoang.graceful.enums.CategoryType;

public record CategoryCriteriaDto(
        CategoryType type,
        Boolean enabled
) {
}
