package id.vn.thongdanghoang.graceful.dtos.payments;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import id.vn.thongdanghoang.graceful.dtos.LocalTimeDeserializer;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class DeliveryDateTimeDTO {
    private LocalDate deliveryDate;
    @JsonDeserialize(using = LocalTimeDeserializer.class)
    private LocalTime deliveryTimeFrom;
    @JsonDeserialize(using = LocalTimeDeserializer.class)
    private LocalTime deliveryTimeTo;
}
