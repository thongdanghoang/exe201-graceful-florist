package id.vn.thongdanghoang.graceful.dtos.users;

import id.vn.thongdanghoang.graceful.dtos.AbstractAuditableDTO;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.UUID;

@Data
@EqualsAndHashCode(callSuper = true)
public class UserDTO extends AbstractAuditableDTO {

    @NotNull
    private String firstName;

    @NotNull
    private String lastName;

    @NotNull
    private String address;

    private UUID avatar;
}
