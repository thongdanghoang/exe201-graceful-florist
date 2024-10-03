package id.vn.thongdanghoang.graceful.dtos;

import lombok.Data;

import java.util.Set;

@Data
public class SortDto {
    public static final String ASC = "asc";
    public static final String DESC = "desc";
    public static final Set<String> DIRECTIONS = Set.of(ASC, DESC);
    private String column;
    private String direction;
}
