package id.vn.thongdanghoang.graceful.dtos.admin;

import id.vn.thongdanghoang.graceful.dtos.AbstractAuditableDTO;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class StaffDTO extends AbstractAuditableDTO {

    private String username;
    private String password;
    private String firstName;
    private String lastName;

}
