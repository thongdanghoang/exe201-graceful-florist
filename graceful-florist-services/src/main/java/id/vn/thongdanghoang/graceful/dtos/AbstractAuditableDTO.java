package id.vn.thongdanghoang.graceful.dtos;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AbstractAuditableDTO extends AbstractBaseDTO{
    private String createdBy;
    private LocalDateTime createdDate;
    private LocalDateTime lastModifiedDate;
    private String lastModifiedBy;

    protected AbstractAuditableDTO() {
        // Abstract class should not be instantiated
    }
}
