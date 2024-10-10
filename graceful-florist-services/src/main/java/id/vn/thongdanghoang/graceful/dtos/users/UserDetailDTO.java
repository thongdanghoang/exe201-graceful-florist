package id.vn.thongdanghoang.graceful.dtos.users;

import id.vn.thongdanghoang.graceful.dtos.AbstractAuditableDTO;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.UUID;

@Data
@EqualsAndHashCode(callSuper = true)
public class UserDetailDTO extends AbstractAuditableDTO {
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private UUID avatar;
}