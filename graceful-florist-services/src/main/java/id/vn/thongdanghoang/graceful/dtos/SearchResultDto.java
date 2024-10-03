package id.vn.thongdanghoang.graceful.dtos;

import lombok.Data;

import java.util.List;

@Data
public class SearchResultDto<T> {
    private List<T> results;
    private long total;

    public static <T> SearchResultDto<T> of(List<T> results, long total){
        SearchResultDto<T> dto = new SearchResultDto<>();
        dto.setResults(results);
        dto.setTotal(total);
        return dto;
    }
}
