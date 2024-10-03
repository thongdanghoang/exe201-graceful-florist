package id.vn.thongdanghoang.graceful.dtos;

import lombok.Data;

import java.util.UUID;

@Data
public class AbstractBaseDTO {
    protected UUID id;
    protected int version;
    
    protected AbstractBaseDTO() {
        // Abstract class should not be instantiated
    }
}
