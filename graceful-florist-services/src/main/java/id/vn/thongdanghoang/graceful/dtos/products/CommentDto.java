package id.vn.thongdanghoang.graceful.dtos.products;

import id.vn.thongdanghoang.graceful.dtos.AbstractAuditableDTO;
import id.vn.thongdanghoang.graceful.dtos.users.UserDTO;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;
import java.util.UUID;

@Data
@EqualsAndHashCode(callSuper = true)
public class CommentDto extends AbstractAuditableDTO {
    private String description;
    private UserDTO userDTO;
    private int rating;
    private List<UUID> images;
    private boolean anonymous;
}
