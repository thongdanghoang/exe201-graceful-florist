package id.vn.thongdanghoang.graceful.dtos.payments;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class DeliveryDateTimeDTO {
    private LocalDate deliveryDate;
    private LocalTime deliveryTimeFrom;
    private LocalTime deliveryTimeTo;
}
