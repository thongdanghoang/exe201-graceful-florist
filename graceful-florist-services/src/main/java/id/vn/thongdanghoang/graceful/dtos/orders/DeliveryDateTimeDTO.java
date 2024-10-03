package id.vn.thongdanghoang.graceful.dtos.orders;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class DeliveryDateTimeDTO {
    private LocalDate deliveryDate;
    private LocalDateTime deliveryTime;
}
