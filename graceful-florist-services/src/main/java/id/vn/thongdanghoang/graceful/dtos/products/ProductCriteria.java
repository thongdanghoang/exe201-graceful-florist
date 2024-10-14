package id.vn.thongdanghoang.graceful.dtos.products;


import id.vn.thongdanghoang.graceful.enums.ProductStatus;

import java.util.List;

public record ProductCriteria (
    List<CategoryDTO> categories,
    String keyword,
    ProductStatus status
) {
}
