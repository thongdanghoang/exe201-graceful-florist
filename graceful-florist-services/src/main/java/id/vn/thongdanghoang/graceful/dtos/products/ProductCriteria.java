package id.vn.thongdanghoang.graceful.dtos.products;


import java.util.List;

public record ProductCriteria (
    List<CategoryDTO> categories
) {
}
