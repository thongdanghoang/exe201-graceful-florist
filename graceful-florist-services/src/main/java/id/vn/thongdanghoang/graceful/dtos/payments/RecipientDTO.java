package id.vn.thongdanghoang.graceful.dtos.payments;

import lombok.Data;

@Data
public class RecipientDTO {
    private String fullName;
    private String phone;
    private String district;
    private String ward;
    private String addressDetail;
}
