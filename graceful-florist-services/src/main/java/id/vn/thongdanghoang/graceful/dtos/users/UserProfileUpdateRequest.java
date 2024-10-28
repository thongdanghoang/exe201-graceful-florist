package id.vn.thongdanghoang.graceful.dtos.users;

import id.vn.thongdanghoang.graceful.dtos.AbstractBaseDTO;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.UUID;

@Data
@EqualsAndHashCode(callSuper = true)
public class UserProfileUpdateRequest extends AbstractBaseDTO {
    @NotNull
    private String firstName;
    @NotNull
    private String lastName;

    private String email;
    private String address;
    private UUID avatar;
    private String currentPassword;
    private String newPassword;
    private String confirmPassword;
}
