package id.vn.thongdanghoang.graceful.dtos;

import lombok.Data;

@Data
public class RequestWrapper <T> {
    private T value;
}
