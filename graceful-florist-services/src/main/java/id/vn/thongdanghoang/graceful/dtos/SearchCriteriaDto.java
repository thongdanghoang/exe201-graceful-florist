package id.vn.thongdanghoang.graceful.dtos;

import lombok.Data;

@Data
public class SearchCriteriaDto<T> {
    private SearchPageDto page;
    private T criteria;
    private SortDto sort;
}
